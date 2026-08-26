import type { Metadata } from 'next';
import { Fraunces, Karla, Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-karla',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bakery — 100% Eggless Artisan Cakes',
  description: 'Bakery — 100% eggless artisan bakery crafting bespoke celebration cakes, pure rooftop honey drizzles, and 3D preview designs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable} ${cormorant.variable} ${outfit.variable}`}>
      <body className="bg-bg-cream text-text-dark font-karla antialiased selection:bg-honey/30 selection:text-espresso">
        {children}
      </body>
    </html>
  );
}
