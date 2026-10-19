/**
 * Пересчитывает <lastmod> в public/sitemap.xml и заново собирает robots.txt.
 *
 * Даты берутся из двух источников, вручную ничего указывать не нужно:
 *  - статьи блога — поле date в src/data/blog.ts;
 *  - разделы сайта — дата последнего коммита, тронувшего файлы раздела.
 *
 * robots.txt строится из карты сайта: реальные адреса разрешены поимённо,
 * всё остальное закрыто — несуществующие страницы не попадут в индекс.
 *
 * Запуск: node scripts/sync-sitemap.mjs
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITEMAP = resolve(root, 'public/sitemap.xml');
const ROBOTS = resolve(root, 'public/robots.txt');
const INDEX = resolve(root, 'index.html');
const ORIGIN = 'https://fabricwall.ru';
const CLEAN_PARAM = 'utm_source&utm_medium&utm_campaign&utm_term&utm_content&yclid&gclid&from';

/** Дата последнего изменения любого из файлов, ГГГГ-ММ-ДД */
const lastCommit = (files) => {
  const dates = files
    .map((f) => {
      try {
        return execFileSync('git', ['log', '-1', '--format=%cs', '--', f], {
          cwd: root,
          encoding: 'utf8',
        }).trim();
      } catch {
        return '';
      }
    })
    .filter(Boolean);
  return dates.sort().pop() || '';
};

/** Разделы сайта: какие файлы влияют на содержимое страницы */
const SECTIONS = {
  '/': ['src/pages/Index.tsx', 'src/components/site'],
  '/ceilings': ['src/pages/Ceilings.tsx', 'src/components/ceilings', 'src/lib/ceilings.ts'],
  '/acoustics': ['src/pages/Acoustics.tsx', 'src/components/acoustics', 'src/lib/acoustics.ts'],
  '/panels': ['src/pages/Panels.tsx'],
  '/arhitekturnyj-tekstil': ['src/pages/Textile.tsx'],
  '/catalog': ['src/pages/Catalog.tsx', 'src/components/catalog', 'src/data/catalog.ts'],
  '/blog': ['src/pages/Blog.tsx', 'src/data/blog.ts'],
  '/privacy': ['src/pages/Privacy.tsx'],
  '/documents': ['src/pages/Documents.tsx'],
  '/about': ['src/pages/About.tsx', 'src/data/about.ts'],
};

const buildDateMap = () => {
  const map = {};

  for (const [path, files] of Object.entries(SECTIONS)) {
    const d = lastCommit(files);
    if (d) map[path] = d;
  }

  // Для статьи берём updated (дата переработки), иначе date (дата публикации).
  // Так robots видят свежесть текста, а дата публикации на странице не меняется.
  const blog = readFileSync(resolve(root, 'src/data/blog.ts'), 'utf8');
  const posts = [...blog.matchAll(/\n {2}\{\n {4}slug: '([^']+)',([\s\S]*?)\n {2}\},/g)];
  if (!posts.length) {
    throw new Error('blog.ts: не найдено ни одной статьи — проверьте формат');
  }
  for (const [, slug, block] of posts) {
    const date = /\n {4}date:\s*'([^']+)'/.exec(block)?.[1];
    const updated = /\n {4}updated:\s*'([^']+)'/.exec(block)?.[1];
    if (!date) throw new Error(`blog.ts: у статьи ${slug} нет поля date`);
    map[`/blog/${slug}`] = updated || date;
  }

  return map;
};

/**
 * Файлы, которые роботу нужно оставить доступными.
 *
 * /assets/ — обязательно: сайт собран как SPA, и весь текст страницы
 * рисует JavaScript. Закрыв скрипты и стили, мы показываем роботу пустую
 * страницу — он не увидит ни текста, ни вёрстки.
 */
const ALLOWED_FILES = [
  '/assets/',
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico',
  '/favicon.svg',
  '/site.webmanifest',
  '/img/',
  '/*.js$',
  '/*.css$',
  '/*.png$',
  '/*.webp$',
  '/*.svg$',
  '/*.woff2$',
  '/yandex_*.html$',
  // Файл-ключ IndexNow: поисковик обязан его прочитать, иначе отклонит заявки
  '/8028d3ca22c76f5e50942b4e55294902.txt',
];

/**
 * Разделы, открытые целиком, а не поимённо. Новая статья блога доступна
 * роботу сразу после публикации — не нужно ждать, пока Google перечитает
 * robots.txt. Несуществующие адреса внутри раздела в индекс не попадут:
 * страница 404 помечается noindex.
 */
const OPEN_PREFIXES = ['/blog/'];

/**
 * robots.txt по принципу «разрешено только перечисленное».
 * Любой адрес с опечаткой не совпадёт ни с одним Allow и будет закрыт —
 * робот узнает об этом до обращения к странице.
 */
const buildRobots = (allPaths) => {
  const paths = allPaths.filter((p) => !OPEN_PREFIXES.some((pre) => p.startsWith(pre)));
  // Для каждого адреса три правила: сам адрес, он же со слэшем на конце
  // и он же с параметрами (?utm_source=…, ?yclid=… из рекламы).
  // Без варианта со слэшем /blog/ упирается в общий Disallow: / —
  // Google Search Console отвечает «Заблокировано в файле robots.txt».
  const allow = [...new Set(paths)].sort().flatMap((p) =>
    p === '/'
      ? ['Allow: /$', 'Allow: /?*']
      : [`Allow: ${p}$`, `Allow: ${p}/$`, `Allow: ${p}?*`, `Allow: ${p}/?*`],
  );
  const open = OPEN_PREFIXES.map((p) => `Allow: ${p}`);
  const files = ALLOWED_FILES.map((p) => `Allow: ${p}`);

  const rules = [
    ...allow,
    ...open,
    ...files,
    '',
    '# Всё, что не перечислено выше, — несуществующие адреса и опечатки',
    'Disallow: /',
  ];

  return [
    '# Файл собирается автоматически: scripts/sync-sitemap.mjs',
    '# Править вручную не нужно — список берётся из sitemap.xml',
    '',
    'User-agent: Yandex',
    ...rules,
    `Clean-param: ${CLEAN_PARAM}`,
    '',
    'User-agent: *',
    ...rules,
    '',
    `Sitemap: ${ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');
};

const run = () => {
  const map = buildDateMap();
  const xml = readFileSync(SITEMAP, 'utf8');
  const changed = [];
  const unknown = [];

  const out = xml.replace(/<url>([\s\S]*?)<\/url>/g, (whole, block) => {
    const loc = /<loc>(.*?)<\/loc>/.exec(block)?.[1] ?? '';
    const path = loc.replace(ORIGIN, '') || '/';
    const next = map[path];

    if (!next) {
      unknown.push(path);
      return whole;
    }

    const current = /<lastmod>(.*?)<\/lastmod>/.exec(block)?.[1];
    if (current === next) return whole;

    changed.push([path, current ?? '—', next]);
    const updated = current
      ? block.replace(`<lastmod>${current}</lastmod>`, `<lastmod>${next}</lastmod>`)
      : block.replace(/(<\/loc>)/, `$1\n    <lastmod>${next}</lastmod>`);
    return `<url>${updated}</url>`;
  });

  if (changed.length) writeFileSync(SITEMAP, out);

  console.log(`sitemap: ${changed.length} дат обновлено`);
  changed.forEach(([p, a, b]) => console.log(`  ${p} ${a} -> ${b}`));
  if (unknown.length) {
    console.log(`\nНет данных о дате (оставлено как было): ${unknown.length}`);
    unknown.forEach((p) => console.log(`  ${p}`));
  }

  const paths = [...out.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => m[1].replace(ORIGIN, '') || '/',
  );
  const robots = buildRobots(paths);
  const before = readFileSync(ROBOTS, 'utf8');
  if (before !== robots) {
    writeFileSync(ROBOTS, robots);
    console.log(`\nrobots.txt пересобран: разрешено ${paths.length} адресов, остальное закрыто`);
  } else {
    console.log('\nrobots.txt без изменений');
  }

  syncBlogMeta();
};

/** Вытаскивает строковое поле статьи: 'текст', "текст" или `текст` */
const field = (block, key) => {
  const m = new RegExp(`\\n {4}${key}:\\s*(['"\`])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1`).exec(block);
  return m ? m[2].replace(/\\(.)/g, '$1') : '';
};

/**
 * Вписывает заголовок и описание каждой статьи в ранний скрипт index.html.
 * Он ставит их до загрузки сайта, как у разделов: робот, не дождавшийся
 * отрисовки, иначе видит у статьи заголовок главной и считает её копией.
 */
const syncBlogMeta = () => {
  const blog = readFileSync(resolve(root, 'src/data/blog.ts'), 'utf8');
  const posts = [...blog.matchAll(/\n {2}\{\n {4}slug: '([^']+)',([\s\S]*?)\n {2}\},/g)];
  const map = {};
  for (const [, slug, block] of posts) {
    const title = field(block, 'seoTitle') || field(block, 'title');
    const description = field(block, 'seoDescription') || field(block, 'excerpt');
    if (!title || !description) throw new Error(`blog.ts: у статьи ${slug} нет заголовка или описания`);
    map[`/blog/${slug}`] = [`${title} | Fabric Wall`, description];
  }

  const json = JSON.stringify(map, null, 2)
    .replace(/</g, '\\u003c')
    .split('\n')
    .map((line, i) => (i ? `        ${line}` : line))
    .join('\n');
  const html = readFileSync(INDEX, 'utf8');
  const marker = /\/\*blog:start\*\/[\s\S]*?\/\*blog:end\*\//;
  if (!marker.test(html)) throw new Error('index.html: не найдена метка /*blog:start*/');
  const next = html.replace(marker, () => `/*blog:start*/${json}/*blog:end*/`);
  if (next !== html) {
    writeFileSync(INDEX, next);
    console.log(`index.html: заголовки ${posts.length} статей обновлены`);
  } else {
    console.log('index.html: заголовки статей без изменений');
  }
};

run();