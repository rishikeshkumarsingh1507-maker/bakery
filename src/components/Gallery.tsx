'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const galleryItems = [
  { url: '/products/pink-name-cake.jpg', label: 'Pink Rosette Name Cake', category: 'Birthday Signature', span: 'col-span-1' },
  { url: '/products/bride-to-be-cake.jpg', label: 'Bride to Be Floral Tier', category: 'Wedding & Bridal', span: 'col-span-1 md:col-span-2' },
  { url: '/products/mermaid-cake.jpg', label: 'Ocean Siren Mermaid Cake', category: 'Showstopper Tier', span: 'col-span-1' },
  { url: '/products/image12.jpg', label: 'Glazed Strawberry Cheesecake', category: 'Special Flavour', span: 'col-span-1' },
  { url: '/products/image13.jpg', label: 'Lotus Biscoff Salted Caramel', category: 'Pastry Delights', span: 'col-span-1' },
  { url: '/products/image8.jpg', label: 'Blush Pink Heart Cake', category: 'Anniversary Special', span: 'col-span-1' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 px-4 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-honey/40 text-xs font-semibold uppercase tracking-[3px] text-amber mb-4 shadow-sm">
            <Sparkles size={14} className="text-honey" />
            Visual Feast
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl text-espresso font-semibold">
            The Artisan <span className="italic honey-gradient-text">Lookbook</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto mt-4 text-base font-light leading-relaxed">
            Step into our gallery of handcrafted centerpieces — each an original work of culinary sculpting and golden glaze.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative h-[320px] sm:h-[360px] rounded-3xl overflow-hidden shadow-glass hover:shadow-honey-lg transition-all duration-500 border border-honey/25`}
            >
              <img
                src={item.url}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-[2px] text-honey font-bold mb-1">
                  {item.category}
                </span>
                <h3 className="font-fraunces text-xl font-semibold text-white mb-2">
                  {item.label}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
                  <span>100% Eggless</span>
                  <span>·</span>
                  <span className="text-honey">Hand-sculpted</span>
                </div>
              </div>

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-semibold text-espresso uppercase tracking-wider border border-honey/30 shadow-sm">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/#customizer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm border border-honey/40 text-espresso text-xs font-semibold hover:bg-amber hover:text-white hover:border-amber shadow-sm hover:shadow-honey transition-all"
          >
            Have a Dream Cake Vision? Let’s Bake It
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
