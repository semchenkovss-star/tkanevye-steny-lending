/**
 * Сообщает поисковикам об обновлённых страницах после публикации сайта.
 *
 * Запускается автоматически в конце сборки: берёт из sitemap.xml адреса,
 * изменённые за последние дни, и отправляет их через облачную функцию
 * в IndexNow (Яндекс и Bing) и в Яндекс Вебмастер.
 *
 * Сборку не ломает: если поисковик недоступен, пишем предупреждение
 * и выходим с успехом — публикация сайта важнее уведомления.
 */
const ENDPOINT = 'https://functions.poehali.dev/fce2f1cd-87dd-4181-9960-6e702e804bef';
const DAYS = 7;

const run = async () => {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days: DAYS }),
      signal: ctrl.signal,
    });

    const data = await res.json();

    if (!data.urls) {
      console.log(`Переобход: за ${DAYS} дн. изменённых страниц нет.`);
      return;
    }

    const parts = [`Переобход: страниц ${data.urls}`];
    if (data.indexnow?.ok) {
      parts.push(`IndexNow — принято (${data.indexnow.sent})`);
    } else if (data.indexnow?.status === 403) {
      // Ключ проверяется по файлу на сайте. Сразу после первой сборки его
      // ещё нет в сети — заявки начнут проходить после публикации.
      parts.push('IndexNow — ждёт публикации файла-ключа (это нормально)');
    } else {
      parts.push(`IndexNow — не принято, код ${data.indexnow?.status || '?'}`);
    }

    if (data.webmaster?.enabled) parts.push(`Вебмастер — отправлено ${data.webmaster.sent}`);
    else parts.push('Вебмастер — выключен (нет токена)');

    console.log(parts.join(' | '));
  } catch (e) {
    console.warn('Переобход: уведомить поисковики не удалось —', e.message);
  } finally {
    clearTimeout(timer);
    // Уведомление поисковиков — необязательный шаг. Что бы здесь ни
    // случилось, сайт уже собран: публикацию из-за этого не роняем.
    process.exit(0);
  }
};

run();