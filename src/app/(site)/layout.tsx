import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BackToTop from '@/components/BackToTop';
import BakeryBackground from '@/components/BakeryBackground';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BakeryBackground />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
