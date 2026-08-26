# Crumble Bakery — Next.js + Tailwind + 3D + Dashboard

## Complete Setup Guide

### Step 1: Extract the Project
```bash
# Extract the tar.gz file you downloaded
tar -xzf crumble-bakery-nextjs.tar.gz
cd crumble-next
```

### Step 2: Install Dependencies
```bash
npm install
```
This installs: Next.js 14, React 18, TypeScript, Tailwind CSS, three.js, @react-three/fiber, @react-three/drei, framer-motion, lucide-react, gsap

### Step 3: Run the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser

### Step 4: Build for Production
```bash
npm run build
npm start
```

---

## Project Structure (26 files)

```
crumble-next/
├── package.json              # Dependencies & scripts
├── next.config.js            # Next.js config (images, strict mode)
├── tailwind.config.ts        # Tailwind theme with Crumble colors
├── postcss.config.js         # PostCSS config
├── tsconfig.json             # TypeScript config (@/* path alias)
├── .gitignore                # Git ignore rules
├── next-env.d.ts             # Next.js types
│
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind directives + CSS variables + fonts
│   │   ├── layout.tsx        # Root layout (fonts, metadata)
│   │   ├── (site)/
│   │   │   ├── layout.tsx    # Site layout (Navbar, Footer, WhatsApp, BackToTop)
│   │   │   └── page.tsx      # Homepage (Hero, Products, About, Gallery, Contact)
│   │   └── dashboard/
│   │       ├── layout.tsx    # Dashboard layout (Sidebar)
│   │       ├── page.tsx      # Dashboard overview (stats, chart, orders)
│   │       ├── orders/page.tsx    # Orders management table
│   │       ├── products/page.tsx  # Products management grid
│   │       ├── customers/page.tsx # Customer list
│   │       └── settings/page.tsx   # Bakery settings form
│   │
│   ├── components/
│   │   ├── Navbar.tsx        # Fixed nav, scroll-aware, mobile menu
│   │   ├── Hero.tsx          # Hero section with 3D cake
│   │   ├── ThreeDCake.tsx    # Interactive 3D cake (@react-three/fiber)
│   │   ├── ProductCard.tsx   # Product card with 3D + Order buttons
│   │   ├── ProductGrid.tsx   # Products section grid
│   │   ├── About.tsx         # About section with stats
│   │   ├── Features.tsx      # 4 feature cards (lucide icons)
│   │   ├── Gallery.tsx       # Masonry gallery grid
│   │   ├── Testimonials.tsx  # Horizontal scroll testimonials
│   │   ├── Contact.tsx       # Contact form → WhatsApp + Google Maps
│   │   ├── Footer.tsx        # Footer with social links
│   │   ├── WhatsAppFloat.tsx # Floating WhatsApp button
│   │   ├── BackToTop.tsx     # Back-to-top button
│   │   └── dashboard/
│   │       └── Sidebar.tsx   # Dashboard sidebar with active links
│   │
│   └── data/
│       ├── products.ts       # 6 products with TypeScript interface
│       └── testimonials.ts   # 3 customer testimonials
```

---

## File-by-File Contents

### 1. package.json
```json
{
  "name": "crumble-next",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@react-three/drei": "^9.105.6",
    "@react-three/fiber": "^8.16.6",
    "framer-motion": "^11.2.10",
    "gsap": "^3.12.5",
    "lucide-react": "^0.378.0",
    "next": "^14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.164.1"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.164.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5"
  }
}
```

### 2. next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
module.exports = nextConfig;
```

### 3. tailwind.config.ts
```ts
import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#8B5E3C", light: "#C49A6C", dark: "#5C3A1E" },
        accent: { DEFAULT: "#E8B4B8", warm: "#F5E6D3" },
        "bg-cream": "#FDF8F3",
        "text-dark": "#2D1810",
        "text-light": "#F5E6D3",
        "text-muted": "#8B7B6B",
        gold: "#D4A574",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

### 4. postcss.config.js
```js
module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

### 5. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true, "skipLibCheck": true, "strict": true, "noEmit": true,
    "esModuleInterop": true, "module": "esnext", "moduleResolution": "bundler",
    "resolveJsonModule": true, "isolatedModules": true, "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 6. src/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #8B5E3C;
  --primary-light: #C49A6C;
  --primary-dark: #5C3A1E;
  --accent: #E8B4B8;
  --accent-warm: #F5E6D3;
  --bg-cream: #FDF8F3;
  --bg-dark: #2A1A10;
  --text-dark: #2D1810;
  --text-light: #F5E6D3;
  --text-muted: #8B7B6B;
  --gold: #D4A574;
}

html { scroll-behavior: smooth; }
body { background-color: #FDF8F3; color: #2D1810; font-family: 'Outfit', sans-serif; overflow-x: hidden; }
h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #FDF8F3; }
::-webkit-scrollbar-thumb { background: #C49A6C; border-radius: 10px; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

### 7. src/app/layout.tsx
```tsx
import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'], variable: '--font-cormorant',
});
const outfit = Outfit({
  subsets: ['latin'], weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Crumble Bakery — Neemrana | Artisan Cakes & Desserts',
  description: 'Artisan bakery crafting premium cakes and desserts in Neemrana.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="bg-bg-cream text-text-dark font-sans antialiased">{children}</body>
    </html>
  );
}
```

### 8. src/app/(site)/layout.tsx
```tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BackToTop from '@/components/BackToTop';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
```

### 9. src/app/(site)/page.tsx
```tsx
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import About from '@/components/About';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <About />
      <Features />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
```

### 10. src/data/products.ts
```ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  threeDLink: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category?: string;
  salesCount?: number;
}

export const products: Product[] = [
  { id: "1", name: "Belgian Chocolate Truffle", slug: "belgian-chocolate-truffle", description: "Rich Belgian dark chocolate layers wrapped in silky ganache.", price: 1200, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", badge: "Bestseller", threeDLink: "https://your-3d-model-site.com/chocolate-truffle" },
  { id: "2", name: "Red Velvet Royale", slug: "red-velvet-royale", description: "Velvety cocoa-infused layers with creamy mascarpone frosting.", price: 1500, badge: "New", image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=600&q=80", threeDLink: "https://your-3d-model-site.com/red-velvet" },
  { id: "3", name: "Strawberry Cloud", slug: "strawberry-cloud", description: "Fresh strawberry compote between vanilla sponge.", price: 1350, badge: "Premium", image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80", threeDLink: "https://your-3d-model-site.com/strawberry-cloud" },
  { id: "4", name: "Pistachio Dream", slug: "pistachio-dream", description: "Roasted pistachio sponge with rose-scented cream.", price: 1800, image: "https://images.unsplash.com/photo-1576615874050-39e1b9a4fc6e?w=600&q=80", threeDLink: "https://your-3d-model-site.com/pistachio-dream" },
  { id: "5", name: "Blueberry Bliss", slug: "blueberry-bliss", description: "Wild blueberry compote layered with lemon sponge.", price: 1450, badge: "Vegan", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", threeDLink: "https://your-3d-model-site.com/blueberry-bliss" },
  { id: "6", name: "Tiramisu Temptation", slug: "tiramisu-temptation", description: "Espresso-soaked ladyfingers with mascarpone cream.", price: 1650, badge: "Limited", image: "https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600&q=80", threeDLink: "https://your-3d-model-site.com/tiramisu-temptation" },
];
```

### 11. src/data/testimonials.ts
```ts
export interface Testimonial { name: string; role: string; text: string; rating: number; avatar: string; }
export const testimonials: Testimonial[] = [
  { name: "Priya Sharma", role: "Wedding Order · Neemrana", text: "The 3D view feature is incredible! I could see exactly what my wedding cake would look like before ordering.", rating: 5, avatar: "P" },
  { name: "Rajesh Kumar", role: "Birthday Order · Neemrana", text: "Ordered the Belgian Chocolate Truffle for my daughter's birthday. Most beautiful and delicious cake in Neemrana!", rating: 5, avatar: "R" },
  { name: "Ananya Gupta", role: "Anniversary Order · Neemrana", text: "The Pistachio Dream cake was unlike anything I've tasted. Pure art. The 3D preview was so helpful!", rating: 5, avatar: "A" },
];
```

---

## All Component Files

The remaining 14 component files + 6 dashboard pages are included in the downloaded tar.gz file. Each file is a complete, production-ready TypeScript React component.

### Components Overview:
- **Navbar.tsx** — Fixed navbar with scroll detection, mobile hamburger menu
- **Hero.tsx** — Split layout, animated entrance with framer-motion, 3D cake on right
- **ThreeDCake.tsx** — Interactive 3D cake using @react-three/fiber (drag to rotate, auto-rotate)
- **ProductCard.tsx** — Product card with 3D button + WhatsApp Order button
- **ProductGrid.tsx** — Responsive 3-column grid of product cards
- **About.tsx** — Dark section with image, story text, animated stats
- **Features.tsx** — 4 feature cards with lucide-react icons
- **Gallery.tsx** — Masonry grid with hover overlays
- **Testimonials.tsx** — Horizontal scroll testimonials carousel
- **Contact.tsx** — Order form → WhatsApp + contact info + Google Maps embed
- **Footer.tsx** — Dark footer with social links and navigation
- **WhatsAppFloat.tsx** — Floating WhatsApp button (bottom right)
- **BackToTop.tsx** — Back-to-top button (appears after scroll)
- **dashboard/Sidebar.tsx** — Dashboard sidebar with active link highlighting

### Dashboard Pages:
- **dashboard/page.tsx** — Overview: 4 stat cards, revenue chart, recent orders, top products
- **dashboard/orders/page.tsx** — Orders table with filters, status badges, pagination
- **dashboard/products/page.tsx** — Product grid with 3D status, search, add product modal
- **dashboard/customers/page.tsx** — Customer list with search and stats
- **dashboard/settings/page.tsx** — Bakery settings form

---

## Key Customizations

### Change Phone Number
Search for `919876543210` across all files and replace with your number.

### Add 3D Model Links
Edit `src/data/products.ts` and replace `threeDLink` values with your actual 3D model URLs.

### Change Colors
Edit `tailwind.config.ts` → `theme.extend.colors` and `src/app/globals.css` → `:root` variables.

### Change Bakery Info
Edit address/phone/email in `src/components/Contact.tsx` and `src/components/Footer.tsx`.

---

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with custom Crumble theme
- **@react-three/fiber** + **@react-three/drei** for 3D cake
- **framer-motion** for scroll animations
- **lucide-react** for icons
- **Google Fonts**: Cormorant Garamond (serif) + Outfit (sans)

## Routes
- `/` — Main website (hero, products, about, gallery, testimonials, contact)
- `/dashboard` — Admin overview (stats, chart, recent orders)
- `/dashboard/orders` — Order management
- `/dashboard/products` — Product management
- `/dashboard/customers` — Customer list
- `/dashboard/settings` — Settings

## Build Status
✅ Project compiles and builds successfully (`npm run build` passes)
```

### Routes
- `/` — Main website
- `/dashboard` — Admin overview
- `/dashboard/orders` — Order management  
- `/dashboard/products` — Product management
- `/dashboard/customers` — Customer list
- `/dashboard/settings` — Settings
