'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles, Wand2, ShieldCheck, HeartHandshake } from 'lucide-react';

const ThreeDCake = dynamic(() => import('./ThreeDCake'), { ssr: false });

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-28 pb-16">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-4 md:px-16 w-full">
        {/* Left Headline Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-7 text-left"
        >
          {/* Brand Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[3px] uppercase font-semibold text-amber px-4 py-2 bg-white/70 backdrop-blur-md rounded-full border border-honey/40 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-honey animate-pulse" />
            100% Eggless · Artisan Bakery · Rishikesh
          </div>

          <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-espresso font-medium tracking-tight mb-6">
            Baked with <span className="italic honey-gradient-text">passion</span>,
            <br />
            served with <span className="italic honey-gradient-text">warm honey</span>.
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8 max-w-xl font-light">
            Welcome to <span className="font-medium text-espresso">Bakery</span>. Every cake is sculpted with raw rooftop honey, Belgian chocolate, and meticulous attention to detail — 100% eggless, always extraordinary.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/#products"
              className="px-8 py-4 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white rounded-full font-medium text-sm transition-all inline-flex items-center gap-2.5 shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 group"
            >
              Explore Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/#customizer"
              className="px-8 py-4 border border-honey/50 text-espresso rounded-full font-medium text-sm hover:bg-honey/15 hover:border-amber hover:-translate-y-0.5 transition-all bg-white/60 backdrop-blur-sm inline-flex items-center gap-2 shadow-sm"
            >
              <Wand2 size={16} className="text-amber" />
              Bespoke Cake Studio
            </Link>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-honey/20 max-w-lg">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <ShieldCheck size={16} className="text-amber shrink-0" />
              <span>100% Eggless</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Sparkles size={16} className="text-amber shrink-0" />
              <span>Rooftop Raw Honey</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-text-muted col-span-2 sm:col-span-1">
              <HeartHandshake size={16} className="text-amber shrink-0" />
              <span>Interactive 3D Preview</span>
            </div>
          </div>
        </motion.div>

        {/* Right 3D Visualizer Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-5 relative"
        >
          <ThreeDCake />
        </motion.div>
      </div>

      {/* Scroll indicator at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="text-center mt-6 z-10"
      >
        <Link
          href="/#products"
          className="inline-flex flex-col items-center gap-2 text-text-muted/70 hover:text-amber transition-colors"
        >
          <span className="text-[11px] tracking-[2.5px] uppercase font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
