import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import BespokeCustomizer from '@/components/BespokeCustomizer';
import About from '@/components/About';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <ProductGrid />
      <BespokeCustomizer />
      <About />
      <Features />
      <Gallery />
      <Testimonials />
      <Contact />
    </main>
  );
}
