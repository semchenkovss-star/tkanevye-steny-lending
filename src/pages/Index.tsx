import Seo from '@/components/Seo';
import { QUESTIONS } from '@/components/site/Faq';
import StickyHeader from '@/components/site/StickyHeader';
import Hero from '@/components/site/Hero';
import Pain from '@/components/site/Pain';
import Services from '@/components/site/Services';
import WhatIsIt from '@/components/site/WhatIsIt';
import Benefits from '@/components/site/Benefits';
import HowItWorks from '@/components/site/HowItWorks';
import Fabrics from '@/components/site/Fabrics';
import Cases from '@/components/site/Cases';
import Pricing from '@/components/site/Pricing';
import Calculator from '@/components/site/Calculator';
import Reviews from '@/components/site/Reviews';
import About from '@/components/site/About';
import Faq from '@/components/site/Faq';
import Blog from '@/components/site/Blog';
import CtaForm from '@/components/site/CtaForm';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Полотно',
    description:
      'Установка тканевых стен и потолков на скрытом каркасе в Москве и области. Монтаж за 1–2 дня без пыли и мокрых работ.',
    telephone: '+7 (495) 797-08-09',
    email: 'hello@polotno.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Складочная, 1с18',
      addressLocality: 'Москва',
      addressCountry: 'RU',
    },
    areaServed: 'Москва и Московская область',
    openingHours: 'Mo-Sa 09:00-20:00',
    priceRange: '₽₽',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '640',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Установка тканевых стен на скрытом каркасе',
    provider: { '@type': 'LocalBusiness', name: 'Полотно' },
    areaServed: 'Москва и Московская область',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: QUESTIONS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Тканевые стены под ключ в Москве — монтаж за 1 день | Полотно"
        description="Тканевые стены на скрытом каркасе: ровная стена за 1–2 дня без штукатурки, пыли и просушки. Звукопоглощение αw = 0,30 (MH), скрытие неровностей и коммуникаций, гарантия до 5 лет. Замер и смета за 24 часа."
        path="/"
        jsonLd={JSON_LD}
      />
      <StickyHeader />
      <main>
        <Hero />
        <Pain />
        <Services />
        <WhatIsIt />
        <Benefits />
        <HowItWorks />
        <Fabrics />
        <Cases />
        <Pricing />
        <Calculator />
        <Reviews />
        <About />
        <Faq />
        <Blog />
        <CtaForm />
      </main>
      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default Index;