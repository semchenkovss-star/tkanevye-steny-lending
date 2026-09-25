/**
 * Шаги после сборки сайта: предгенерация страниц и уведомление поисковиков.
 *
 * Почему отдельным файлом, а не цепочкой команд в package.json:
 * платформа дописывает свои параметры (--outDir и т.п.) в КОНЕЦ команды
 * сборки. Если там стоят скобки или &&, строка ломается и публикация падает.
 * Поэтому "build" заканчивается на `vite build`, а всё остальное делает
 * "postbuild" — npm и bun запускают его сами после успешной сборки.
 *
 * Оба шага необязательные: сайт уже собран, и любая заминка здесь
 * не должна срывать публикацию.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Куда именно собрался сайт.
 *
 * postbuild не получает параметры сборки, поэтому папку ищем сами:
 * сначала обычная dist, затем самая свежая сборка внутри builds/ —
 * туда складывает результат платформа (--outDir ./builds/<хеш>/<id>).
 */
const outDir = () => {
  if (process.env.BUILD_OUT_DIR) return resolve(root, process.env.BUILD_OUT_DIR);

  const dist = resolve(root, 'dist');
  if (existsSync(resolve(dist, 'index.html'))) return dist;

  const builds = resolve(root, 'builds');
  if (!existsSync(builds)) return dist;

  let best = null;
  const walk = (dir, depth = 0) => {
    if (depth > 3) return;
    for (const name of readdirSync(dir)) {
      const full = resolve(dir, name);
      if (!statSync(full).isDirectory()) continue;
      if (existsSync(resolve(full, 'index.html'))) {
        const t = statSync(resolve(full, 'index.html')).mtimeMs;
        if (!best || t > best.t) best = { path: full, t };
      }
      walk(full, depth + 1);
    }
  };
  walk(builds);

  return best ? best.path : dist;
};

const step = (title, cmd, args, env) => {
  const r = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...env },
    timeout: 240000,
  });
  if (r.status !== 0) console.log(`${title}: пропущено`);
};

const dist = outDir();

if (!existsSync(dist)) {
  console.log(`Предгенерация: папка сборки не найдена (${dist}) — пропускаем.`);
} else {
  step('Предгенерация', 'npx', ['vite-node', 'scripts/prerender.mjs'], { BUILD_OUT_DIR: dist });
}

step('Уведомление поисковиков', 'node', ['scripts/notify-search.mjs']);