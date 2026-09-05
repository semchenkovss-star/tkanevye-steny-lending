import {
  EMAIL,
  LEGAL_INN,
  LEGAL_NAME,
  LEGAL_OGRN,
  PHONE_DISPLAY,
  SOCIALS,
  WORK_HOURS,
} from '@/lib/contacts';

export const SITE_NAME = 'Fabric Wall';
export const LEGAL_DESCRIPTION =
  'Установка натяжных тканевых стен и потолков на скрытом каркасе в Москве и области. Тихие стены со звукопоглощением, монтаж за 1–2 дня без пыли и мокрых работ.';

export const origin = () => (typeof window !== 'undefined' ? window.location.origin : '');

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

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${origin()}/#organization`,
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  description: LEGAL_DESCRIPTION,
  url: `${origin()}/`,
  logo: logoLd(),
  image: logoLd(),
  telephone: PHONE_DISPLAY,
  email: EMAIL,
  taxID: LEGAL_INN,
  vatID: LEGAL_OGRN,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Переведеновский пер., д. 3',
    addressLocality: 'Москва',
    addressRegion: 'Москва',
    addressCountry: 'RU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE_DISPLAY,
    contactType: 'sales',
    areaServed: 'RU',
    availableLanguage: 'Russian',
    hoursAvailable: WORK_HOURS,
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

export const localBusinessLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${origin()}/#business`,
  name: SITE_NAME,
  description: LEGAL_DESCRIPTION,
  url: `${origin()}/`,
  telephone: PHONE_DISPLAY,
  email: EMAIL,
  logo: logoLd(),
  image: [abs('/img/og-cover.jpg'), abs('/logo.png')],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Переведеновский пер., д. 3',
    addressLocality: 'Москва',
    addressCountry: 'RU',
  },
  areaServed: [
    { '@type': 'City', name: 'Москва' },
    { '@type': 'AdministrativeArea', name: 'Московская область' },
  ],
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