import { useLocation } from "@/lib/router-compat";
import { stripCity } from '@/data/cities';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  keywords?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const DEFAULT_IMAGE = '/img/og-cover.jpg';
const SITE_NAME = 'Fabric Wall';

const CANONICAL_ORIGIN = 'https://fabricwall.ru';

/**
 * Адрес страницы с учётом города. Страницы передают путь без города
 * ('/catalog'), а город берётся из текущего адреса — иначе на
 * /spb/catalog канонической считалась бы московская версия.
 */
export const canonicalUrl = (path: string, currentPath?: string) => {
  const clean = path.split('?')[0].split('#')[0];
  const normalized = clean.length > 1 ? clean.replace(/\/+$/, '') : '/';

  // Если путь уже содержит город — оставляем как есть
  if (stripCity(normalized).slug) return CANONICAL_ORIGIN + normalized;

  const here = currentPath ?? '';
  const slug = here ? stripCity(here).slug : '';
  const withCity = slug ? `/${slug}${normalized === '/' ? '' : normalized}` : normalized;
  return CANONICAL_ORIGIN + withCity;
};

/**
 * Мета-теги страницы. Нативные теги React 19 поднимаются в <head>
 * и при отрисовке на сервере, и при переходах в браузере.
 */
const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedAt,
  keywords,
  noindex = false,
  jsonLd,
}: SeoProps) => {
  // Текущий адрес берём из роутера: так мета-теги обновляются
  // и при переходах между разделами без перезагрузки страницы.
  const { pathname } = useLocation();

  const url = canonicalUrl(path, pathname);
  const imageUrl = image.startsWith('http') ? image : CANONICAL_ORIGIN + image;
  const ext = imageUrl.split('?')[0].split('.').pop()?.toLowerCase();
  const imageType = ext === 'webp' ? 'image/webp' : ext === 'png' ? 'image/png' : 'image/jpeg';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />
      {/* Закрытая страница не должна объявлять себя канонической */}
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="vk:image" content={imageUrl} />

      {publishedAt && <meta property="article:published_time" content={publishedAt} />}

      {/* Разметка schema.org — данные, а не код: браузер её не исполняет */}
      {jsonLd && (
        <script
          type="application/ld+json"
          data-seo="page"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  );
};

export default Seo;
