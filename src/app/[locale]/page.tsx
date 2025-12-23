import { HeroSection } from '@/components/home/HeroSection';
import { ValuePropositions } from '@/components/home/ValuePropositions';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { TrustSection } from '@/components/home/TrustSection';

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropositions />
      <CategoryShowcase />
      <TrustSection />
    </>
  );
}

