import { useEffect } from 'react';
import Seo from '@/components/Seo';
import { QUESTIONS } from '@/components/site/Faq';
import StickyHeader from '@/components/site/StickyHeader';
import SiteSwitch from '@/components/site/SiteSwitch';
import Hero from '@/components/site/Hero';
import Pain from '@/components/site/Pain';
import Services from '@/components/site/Services';
import WhatIsIt from '@/components/site/WhatIsIt';
import Benefits from '@/components/site/Benefits';
import HowItWorks from '@/components/site/HowItWorks';
import Fabrics from '@/components/site/Fabrics';
import FabricQuiz from '@/components/site/FabricQuiz';
import Cases from '@/components/site/Cases';
import Certificates from '@/components/site/Certificates';
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
import { STEPS } from '@/components/site/HowItWorks';
import CrossLinks from '@/components/site/CrossLinks';
import { faqLd, howToLd, localBusinessLd, serviceLd } from '@/lib/schema';
import { PLANS } from '@/lib/pricing';
import { useCity } from '@/lib/city';
import type { City } from '@/data/cities';

const buildJsonLd = (city: City) => [
  localBusinessLd(city),
  // Цены берём из тарифов, показанных на странице: в разметке не должно
  // быть суммы, которой пользователь на сайте не видит.
  serviceLd({
    name: 'Натяжные тканевые стены на скрытом каркасе',
    serviceType: 'Установка натяжных тканевых стен на скрытом каркасе',
    description:
      'Натяжная тканевая стена под ключ: скрытый каркас, полотно, монтаж за 1–2 дня и уборка. Цена за м² зафиксирована в смете после замера.',
    path: '/',
    tiers: PLANS.map((p) => ({
      name: p.name,
      price: p.rate,
      description: p.for,
    })),
  }),
  howToLd(
    'Как проходит монтаж тканевой стены',
    'Четыре шага от заявки до готовой стены: звонок, замер и смета, раскрой полотна и монтаж с уборкой.',
    STEPS.map((s) => ({ title: s.title, text: s.text })),
  ),
  faqLd(QUESTIONS),
];

const Index = () => {
  const city = useCity();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`Тканевые натяжные стены под ключ за 1 день ${city.inName} | Fabric Wall`}
        description={`Натяжные тканевые стены на скрытом каркасе ${city.inName}: ровная стена за 1–2 дня без пыли и штукатурки. Шумоизоляция, гарантия 5 лет, бесплатный замер.`}
        path="/"
        keywords="тканевые стены, натяжные стены, отделка стен тканью, шумоизоляция стен в квартире, тканевые стены под ключ, тихие стены"
        jsonLd={buildJsonLd(city)}
      />
      <StickyHeader />
      <SiteSwitch />
      <main>
        <Hero />
        <Pain />
        <WhatIsIt />
        <Benefits />
        <HowItWorks />
        <Fabrics />
        <FabricQuiz />
        <Certificates />
        <Cases />
        <Pricing />
        <Calculator />
        <Reviews />
        <About />
        <Services />
        <Faq />
        <Blog />
        <CrossLinks current="/" />
        <CtaForm />
      </main>
      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default Index;