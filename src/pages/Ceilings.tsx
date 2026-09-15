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
import CeilBlog from '@/components/ceilings/CeilBlog';
import Services from '@/components/site/Services';
import { CEIL_FAQ, CEIL_IMG, CEIL_PLANS, CEIL_STEPS } from '@/lib/ceilings';
import { breadcrumbsLd, faqLd, howToLd, serviceLd } from '@/lib/schema';
import CrossLinks from '@/components/site/CrossLinks';

const buildJsonLd = () => [
  breadcrumbsLd([{ name: 'Натяжные потолки', path: '/ceilings' }]),
  serviceLd({
    name: 'Натяжные потолки под ключ',
    serviceType: 'Монтаж натяжных тканевых потолков',
    description:
      'Бесшовные натяжные потолки Descor, JM и Clipso: теневой и парящий контур, световые линии. Монтаж за один день без пыли.',
    path: '/ceilings',
    tiers: CEIL_PLANS.map((p) => ({
      name: p.name,
      price: p.rate,
      description: p.for,
    })),
  }),
  howToLd(
    'Как проходит монтаж натяжного потолка',
    'Четыре шага до готового потолка: заявка, замер и смета, подготовка полотна и монтаж за один день.',
    CEIL_STEPS.map((s) => ({ title: s.title, text: s.text })),
    'P1D',
  ),
  faqLd(CEIL_FAQ),
];

const CeilingsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Тканевый потолок Descor и Clipso: цена и монтаж | Fabric Wall"
        description="Бесшовные натяжные потолки Descor, JM и Clipso: теневой и парящий контур, световые линии. Монтаж за день без пыли, смета за 24 часа."
        path="/ceilings"
        keywords="тканевый натяжной потолок, бесшовный натяжной потолок, потолок descor, clipso потолки, натяжной потолок цена, теневой потолок"
        image={CEIL_IMG.hero}
        jsonLd={buildJsonLd()}
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
        <Services index="10" />
        <CeilBlog />
        <CrossLinks current="/ceilings" />
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