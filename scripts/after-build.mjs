/**
 * Шаг после сборки сайта: уведомление поисковиков об обновлённых страницах.
 *
 * Почему отдельным файлом, а не цепочкой команд в package.json:
 * платформа дописывает свои параметры (--outDir и т.п.) в КОНЕЦ команды
 * сборки. Если там стоят скобки или &&, строка ломается и публикация падает.
 * Поэтому "build" заканчивается на `vite build`, а всё остальное делает
 * "postbuild" — npm и bun запускают его сами после успешной сборки.
 *
 * Шаг необязательный: сайт уже собран, и любая заминка здесь
 * не должна срывать публикацию.
 *
 * Предгенерации страниц здесь больше нет: хостинг платформы отдаёт на все
 * адреса общий index.html, готовые HTML-файлы роботам не попадали.
 */
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const r = spawnSync('node', ['scripts/notify-search.mjs'], {
  cwd: root,
  stdio: 'inherit',
  timeout: 240000,
});
if (r.status !== 0) console.log('Уведомление поисковиков: пропущено');
