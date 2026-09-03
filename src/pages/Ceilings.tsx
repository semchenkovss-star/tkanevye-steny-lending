import { useEffect } from 'react';
import Seo from '@/components/Seo';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';
import CeilHeader from '@/components/ceilings/CeilHeader';
import SiteSwitch from '@/components/site/SiteSwitch';
import CeilHero from '@/components/ceilings/CeilHero';
import { CeilPain, CeilWhat } from '@/components/ceilings/CeilIntro';
import CeilBenefits from '@/components/ceilings/CeilBenefits';
import CeilHow from '@/components/ceilings/CeilHow';
import CeilTextures from '@/components/ceilings/CeilTextures';
import CeilCases from '@/components/ceilings/CeilCases';
import CeilGuide from '@/components/ceilings/CeilGuide';
import CeilPricing from '@/components/ceilings/CeilPricing';
import CeilCalculator from '@/components/ceilings/CeilCalculator';
import { CeilCta, CeilFaq } from '@/components/ceilings/CeilFaqCta';
import CeilCross from '@/components/ceilings/CeilCross';
import { CEIL_FAQ, CEIL_IMG } from '@/lib/ceilings';

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Монтаж натяжных потолков в Москве',
    provider: { '@type': 'LocalBusiness', name: 'Полотно' },
    areaServed: 'Москва и Московская область',
    offers: {
      '@type': 'Offer',
      price: '1200',
      priceCurrency: 'RUB',
      description: 'Бесшовный натяжной потолок под ключ за один день, цена за м²',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CEIL_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  },
];

const CeilingsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Натяжные потолки в Москве под ключ — бесшовный потолок за один день | Полотно"
        description="Натяжные потолки в Москве под ключ: бесшовные полотна Descor, JM и Clipso, теневой и парящий потолок, световые линии. Потолок за один день без пыли и мокрых работ, замер и смета за 24 часа. Москва и область."
        path="/ceilings"
        image={CEIL_IMG.hero}
        jsonLd={JSON_LD}
      />
      <CeilHeader />
      <SiteSwitch />
      <main>
        <CeilHero />
        <CeilPain />
        <CeilWhat />
        <CeilBenefits />
        <CeilHow />
        <CeilTextures />
        <CeilCases />
        <CeilGuide />
        <CeilPricing />
        <CeilCalculator />
        <CeilCross />
        <CeilFaq />
        <CeilCta />
      </main>
      <Footer />
      <FloatingCta />
      <LeadDialog />
    </div>
  );
};

export default CeilingsPage;
