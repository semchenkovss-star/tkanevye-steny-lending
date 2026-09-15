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
  '/catalog': ['src/pages/Catalog.tsx', 'src/components/catalog', 'src/data/catalog.ts'],
  '/blog': ['src/pages/Blog.tsx', 'src/data/blog.ts'],
  '/privacy': ['src/pages/Privacy.tsx'],
};

const buildDateMap = () => {
  const map = {};

  for (const [path, files] of Object.entries(SECTIONS)) {
    const d = lastCommit(files);
    if (d) map[path] = d;
  }

  const blog = readFileSync(resolve(root, 'src/data/blog.ts'), 'utf8');
  const slugs = [...blog.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
  const dates = [...blog.matchAll(/\n {4}date:\s*'([^']+)'/g)].map((m) => m[1]);
  if (slugs.length !== dates.length) {
    throw new Error(`blog.ts: ${slugs.length} статей, но ${dates.length} дат — проверьте формат`);
  }
  slugs.forEach((s, i) => {
    map[`/blog/${s}`] = dates[i];
  });

  return map;
};

/** Файлы в public/, которые роботу нужно оставить доступными */
const ALLOWED_FILES = [
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico',
  '/favicon.svg',
  '/site.webmanifest',
  '/img/',
  '/*.png$',
  '/*.webp$',
  '/*.svg$',
  '/yandex_*.html$',
];

/**
 * robots.txt по принципу «разрешено только перечисленное».
 * Любой адрес с опечаткой не совпадёт ни с одним Allow и будет закрыт —
 * робот узнает об этом до обращения к странице.
 */
const buildRobots = (paths) => {
  // Для каждого адреса два правила: сам адрес и он же с параметрами
  // (?utm_source=…, ?yclid=… из рекламы) — иначе такие ссылки закроются.
  const allow = [...new Set(paths)]
    .sort()
    .flatMap((p) => [`Allow: ${p}$`, `Allow: ${p}?*`]);
  const files = ALLOWED_FILES.map((p) => `Allow: ${p}`);

  const rules = [
    ...allow,
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
    `Host: ${ORIGIN}`,
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
};

run();