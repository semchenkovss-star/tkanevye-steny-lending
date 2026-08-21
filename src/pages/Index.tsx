import StickyHeader from '@/components/site/StickyHeader';
import Hero from '@/components/site/Hero';
import Pain from '@/components/site/Pain';
import WhatIsIt from '@/components/site/WhatIsIt';
import Benefits from '@/components/site/Benefits';
import HowItWorks from '@/components/site/HowItWorks';
import Fabrics from '@/components/site/Fabrics';
import Cases from '@/components/site/Cases';
import Pricing from '@/components/site/Pricing';
import Reviews from '@/components/site/Reviews';
import About from '@/components/site/About';
import Faq from '@/components/site/Faq';
import Blog from '@/components/site/Blog';
import CtaForm from '@/components/site/CtaForm';
import Footer from '@/components/site/Footer';
import FloatingCta from '@/components/site/FloatingCta';
import LeadDialog from '@/components/site/LeadDialog';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <main>
        <Hero />
        <Pain />
        <WhatIsIt />
        <Benefits />
        <HowItWorks />
        <Fabrics />
        <Cases />
        <Pricing />
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