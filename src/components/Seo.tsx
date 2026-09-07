import { useEffect } from 'react';

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

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const CANONICAL_ORIGIN = 'https://fabricwall.ru';

const canonicalUrl = (path: string) => {
  const clean = path.split('?')[0].split('#')[0];
  const normalized = clean.length > 1 ? clean.replace(/\/+$/, '') : '/';
  return CANONICAL_ORIGIN + normalized;
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

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
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const url = canonicalUrl(path);
    const imageUrl = image.startsWith('http') ? image : origin + image;

    document.title = title;
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    );
    setLink('canonical', url);

    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'ru_RU');
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:secure_url', imageUrl);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
    setMeta('name', 'vk:image', imageUrl);

    if (publishedAt) setMeta('property', 'article:published_time', publishedAt);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'page';
    if (jsonLd) {
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (jsonLd && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [title, description, path, image, type, publishedAt, keywords, noindex, jsonLd]);

  return null;
};

export default Seo;