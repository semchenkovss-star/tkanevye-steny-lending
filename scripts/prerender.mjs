/**
 * Предгенерация страниц: превращает каждый адрес сайта в готовый HTML-файл.
 *
 * Зачем: React рисует страницу уже в браузере, поэтому поисковый робот
 * получал пустой файл с одинаковым заголовком и ждал очереди на выполнение
 * скриптов — иногда неделями. Здесь мы один раз при сборке прогоняем те же
 * страницы и кладём рядом готовый HTML с текстом, заголовками H1 и своими
 * мета-тегами для каждого адреса.
 *
 * Для посетителя ничего не меняется: браузер «оживляет» готовую разметку
 * (hydrateRoot в src/main.tsx), и дальше сайт работает как обычно.
 *
 * Запускается автоматически после `vite build`.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
// MemoryRouter, а не StaticRouter из /server: подпакет тянет вторую копию
// маршрутизатора, из-за чего страницы «не видят» контекст и рендер падает.
import { MemoryRouter } from 'react-router-dom';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(root, 'dist');
const TEMPLATE = resolve(DIST, 'index.html');

/**
 * React предупреждает, что useLayoutEffect не работает при рендере вне
 * браузера. Для нас это норма: такие эффекты отрабатывают позже, у посетителя.
 * Но библиотеки вызывают его сотни раз, и лог сборки распухал до 17 тысяч
 * строк — на этом сборка падала. Глушим только это предупреждение,
 * настоящие ошибки по-прежнему видны.
 */
const realError = console.error;
console.error = (...args) => {
  const first = typeof args[0] === 'string' ? args[0] : '';
  if (first.includes('useLayoutEffect does nothing on the server')) return;
  realError(...args);
};

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Собирает список всех адресов сайта из тех же файлов, что и маршруты */
const collectPaths = async () => {
  const { ROUTES } = await import('../src/routes.tsx');
  const { CITIES } = await import('../src/data/cities.ts');
  const { BLOG_POSTS } = await import('../src/data/blog.ts');

  const citySlugs = CITIES.filter((c) => c.slug).map((c) => c.slug);
  const base = [];

  for (const { path } of ROUTES) {
    if (path.includes(':')) continue; // страницы с переменной частью — ниже
    base.push(path);
  }
  for (const post of BLOG_POSTS) base.push(`/blog/${post.slug}`);

  // Те же страницы в папке города: /spb, /spb/catalog и т.д.
  const withCities = [...base];
  for (const slug of citySlugs) {
    for (const p of base) withCities.push(`/${slug}${p === '/' ? '' : p}`);
  }
  return [...new Set(withCities)];
};

/** Собирает <head> страницы из данных, которые отдал компонент Seo */
const buildHead = (seo, canonical) => {
  const tags = [];
  const img = seo.image?.startsWith('http') ? seo.image : `https://fabricwall.ru${seo.image}`;

  tags.push(`<title>${esc(seo.title)}</title>`);
  tags.push(`<meta name="description" content="${esc(seo.description)}">`);
  if (seo.keywords) tags.push(`<meta name="keywords" content="${esc(seo.keywords)}">`);
  tags.push(
    `<meta name="robots" content="${
      seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    }">`,
  );
  if (!seo.noindex) tags.push(`<link rel="canonical" href="${esc(canonical)}">`);

  tags.push(`<meta property="og:site_name" content="Fabric Wall">`);
  tags.push(`<meta property="og:locale" content="ru_RU">`);
  tags.push(`<meta property="og:type" content="${esc(seo.type || 'website')}">`);
  tags.push(`<meta property="og:title" content="${esc(seo.title)}">`);
  tags.push(`<meta property="og:description" content="${esc(seo.description)}">`);
  tags.push(`<meta property="og:url" content="${esc(canonical)}">`);
  tags.push(`<meta property="og:image" content="${esc(img)}">`);
  tags.push(`<meta property="og:image:secure_url" content="${esc(img)}">`);
  tags.push(`<meta property="og:image:width" content="1200">`);
  tags.push(`<meta property="og:image:height" content="630">`);
  tags.push(`<meta property="og:image:alt" content="${esc(seo.title)}">`);

  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${esc(seo.title)}">`);
  tags.push(`<meta name="twitter:description" content="${esc(seo.description)}">`);
  tags.push(`<meta name="twitter:image" content="${esc(img)}">`);
  tags.push(`<meta name="vk:image" content="${esc(img)}">`);

  if (seo.publishedAt)
    tags.push(`<meta property="article:published_time" content="${esc(seo.publishedAt)}">`);

  if (seo.jsonLd) {
    const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-seo="page">${json}</script>`);
  }
  return tags.join('\n    ');
};

/**
 * Вставляет собранные теги в шаблон.
 * Старые title/description/canonical из index.html убираем, иначе на странице
 * окажется два заголовка и робот выберет случайный.
 */
const applyHead = (html, headTags) => {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="keywords"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:(title|description|url|type|image[^"]*)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="(twitter:(card|title|description|image)|vk:image)"[^>]*>\s*/gi, '');

  return out.replace('</head>', `  ${headTags}\n  </head>`);
};

const run = async () => {
  if (!existsSync(TEMPLATE)) {
    console.error('Нет dist/index.html — сначала должна отработать сборка.');
    process.exit(1);
  }

  const template = readFileSync(TEMPLATE, 'utf8');
  const { default: AppRoutes } = await import('../src/AppRoutes.tsx');
  const { seoCollector, canonicalUrl } = await import('../src/components/Seo.tsx');

  // Страницы подключаются «по требованию» (lazy) — до первого обращения
  // их код не загружен, и рендер отдал бы пустую заглушку вместо текста.
  // Поэтому сначала подгружаем все страницы, а потом делаем холостой проход:
  // после него React считает их готовыми и рисует настоящую разметку.
  const { ROUTES: ALL } = await import('../src/routes.tsx');
  await Promise.all(ALL.map((r) => r.load()));

  const paths = await collectPaths();

  // Достаточно по одному представителю каждого вида страницы: React кеширует
  // загруженный код, и остальные адреса того же вида рисуются сразу.
  // Прогонять все 42 адреса дважды — лишние минуты сборки.
  const warmup = [...new Set(paths.map((p) => (p.startsWith('/blog/') ? '/blog/*' : p)))].map(
    (p) => (p === '/blog/*' ? paths.find((x) => x.startsWith('/blog/')) : p),
  );

  for (const p of warmup) {
    try {
      renderToString(
        createElement(MemoryRouter, { initialEntries: [p] }, createElement(AppRoutes)),
      );
    } catch {
      /* холостой проход: ошибки здесь ожидаемы и не важны */
    }
  }
  await new Promise((r) => setTimeout(r, 200));
  let ok = 0;
  const failed = [];


  for (const path of paths) {
    try {
      seoCollector.current = null;

      const markup = renderToString(
        createElement(MemoryRouter, { initialEntries: [path] }, createElement(AppRoutes)),
      );

      const seo = seoCollector.current;
      if (!seo) {
        failed.push(`${path} — страница не сообщила мета-теги`);
        continue;
      }

      const canonical = canonicalUrl(seo.path, seo.currentPath || path);
      let html = applyHead(template, buildHead(seo, canonical));
      html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

      const file =
        path === '/' ? resolve(DIST, 'index.html') : resolve(DIST, `.${path}/index.html`);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
      ok += 1;
    } catch (e) {
      failed.push(`${path} — ${e.message}`);
    }
  }

  console.log(`Собрано страниц: ${ok} из ${paths.length}`);
  if (failed.length) {
    // Не роняем публикацию: сайт уже собран и работоспособен, просто часть
    // страниц осталась без готовой разметки — их дорисует браузер, как раньше.
    console.log('Без готовой разметки (страницы работают, но робот ждёт дольше):');
    for (const f of failed) console.log('  ' + f);
  }

  // Работа сделана. Выходим сами: загруженный код приложения держит
  // открытые таймеры, и без этого процесс висел бы ещё минуты.
  process.exit(0);
};

run().catch((e) => {
  // Предгенерация — улучшение, а не условие работы сайта. Если она
  // сломалась, публикуем обычную сборку и сообщаем причину.
  console.log('Предгенерация пропущена:', e.message);
  process.exit(0);
});