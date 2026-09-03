import { useEffect } from 'react';
import Seo from '@/components/Seo';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';
import CeilHeader from '@/components/ceilings/CeilHeader';
import CeilHero from '@/components/ceilings/CeilHero';
import { CeilPain, CeilWhat } from '@/components/ceilings/CeilIntro';
import CeilBenefits from '@/components/ceilings/CeilBenefits';
import CeilHow from '@/components/ceilings/CeilHow';
import CeilTextures from '@/components/ceilings/CeilTextures';
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
    serviceType: 'Монтаж натяжных потолков',
    provider: { '@type': 'LocalBusiness', name: 'Полотно' },
    areaServed: 'Москва и Московская область',
    offers: {
      '@type': 'Offer',
      price: '1200',
      priceCurrency: 'RUB',
      description: 'Бесшовный натяжной потолок под ключ, цена за м²',
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
        title="Натяжные потолки под ключ в Москве — монтаж за 1 день | Полотно"
        description="Бесшовные натяжные потолки: матовые, сатиновые, глянцевые и акустические. Монтаж за один день без пыли, световые линии и парящий контур, замер и смета за 24 часа. Москва и область."
        path="/ceilings"
        image={CEIL_IMG.hero}
        jsonLd={JSON_LD}
      />
      <CeilHeader />
      <main>
        <CeilHero />
        <CeilPain />
        <CeilWhat />
        <CeilBenefits />
        <CeilHow />
        <CeilTextures />
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
