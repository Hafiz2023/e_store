import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import ProductGrid from '@/components/ProductGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProductGrid />
      <FeatureSection />
      <Testimonials />
    </main>
  );
}
