import {
  EMAIL,
  LEGAL_INN,
  LEGAL_NAME,
  LEGAL_OGRN,
  PHONE_DISPLAY,
  SOCIALS,
  WORK_HOURS,
} from '@/lib/contacts';
import { DEFAULT_CITY, type City } from '@/data/cities';

export const SITE_NAME = 'Fabric Wall';
export const LEGAL_DESCRIPTION =
  'Установка натяжных тканевых стен и потолков на скрытом каркасе. Тихие стены со звукопоглощением, монтаж за 1–2 дня без пыли и мокрых работ. Работаем по России.';

/**
 * Адрес сайта для разметки поисковиков.
 * При сборке страниц (scripts/prerender.mjs) браузера нет, поэтому
 * подставляем боевой домен — иначе в разметке окажутся пустые ссылки.
 */
export const SITE_ORIGIN = 'https://fabricwall.ru';

export const origin = () =>
  typeof window !== 'undefined' ? window.location.origin : SITE_ORIGIN;

const abs = (path: string) => (path.startsWith('http') ? path : origin() + path);

/** Логотип компании для поисковых систем (Яндекс и Google требуют растр) */
export const logoLd = () => ({
  '@type': 'ImageObject',
  '@id': `${origin()}/#logo`,
  url: abs('/logo.png'),
  contentUrl: abs('/logo.png'),
  width: 512,
  height: 512,
  caption: SITE_NAME,
  inLanguage: 'ru-RU',
});

export const organizationLd = (city: City = DEFAULT_CITY) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${origin()}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  description: LEGAL_DESCRIPTION,
  url: `${origin()}/`,
  logo: logoLd(),
  image: logoLd(),
  telephone: city.phoneDisplay,
  email: EMAIL,
  taxID: LEGAL_INN,
  vatID: LEGAL_OGRN,
  address: {
    '@type': 'PostalAddress',
    streetAddress: city.street,
    addressLocality: city.name,
    addressRegion: city.region,
    addressCountry: 'RU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: city.phoneDisplay,
    contactType: 'sales',
    areaServed: 'RU',
    availableLanguage: 'Russian',
    hoursAvailable: city.workHours,
  },
  sameAs: SOCIALS.map((s) => s.href),
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${origin()}/#website`,
  name: SITE_NAME,
  url: `${origin()}/`,
  inLanguage: 'ru-RU',
  publisher: { '@id': `${origin()}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${origin()}/catalog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const localBusinessLd = (city: City = DEFAULT_CITY) => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${origin()}/#business`,
  name: SITE_NAME,
  description: LEGAL_DESCRIPTION,
  url: `${origin()}/`,
  telephone: city.phoneDisplay,
  email: EMAIL,
  logo: logoLd(),
  image: [abs('/img/og-cover.jpg'), abs('/logo.png')],
  address: {
    '@type': 'PostalAddress',
    streetAddress: city.street,
    addressLocality: city.name,
    addressRegion: city.region,
    addressCountry: 'RU',
  },
  areaServed: { '@type': 'City', name: city.name },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '20:00',
  },
  priceRange: '₽₽',
  parentOrganization: { '@id': `${origin()}/#organization` },
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbsLd = (crumbs: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Главная', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: origin() + c.path,
  })),
});

export interface HowToStep {
  title: string;
  text: string;
}

export const howToLd = (
  name: string,
  description: string,
  steps: HowToStep[],
  totalTime = 'P2D',
) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  totalTime,
  supply: [{ '@type': 'HowToSupply', name: 'Полотно и скрытый каркас' }],
  tool: [{ '@type': 'HowToTool', name: 'Лазерный уровень' }],
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.text,
  })),
});

export interface ServiceTier {
  name: string;
  price: number;
  description: string;
}

/**
 * Услуга с тарифами: Яндекс показывает «от … ₽» прямо в выдаче.
 * Диапазон берётся из тарифов, каждый тариф — отдельное предложение.
 */
export const serviceLd = (opts: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  tiers: ServiceTier[];
  unitText?: string;
}) => {
  const prices = opts.tiers.map((t) => t.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${origin()}${opts.path}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: `${origin()}${opts.path}`,
    provider: { '@id': `${origin()}/#organization` },
    areaServed: { '@type': 'Country', name: 'Россия' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: opts.tiers.length,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${origin()}/#organization` },
      offers: opts.tiers.map((t) => ({
        '@type': 'Offer',
        name: t.name,
        price: t.price,
        priceCurrency: 'RUB',
        description: t.description,
        url: `${origin()}${opts.path}`,
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: t.price,
          priceCurrency: 'RUB',
          unitCode: 'MTK',
          unitText: opts.unitText ?? 'м²',
        },
      })),
    },
  };
};

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export { abs as absoluteUrl };