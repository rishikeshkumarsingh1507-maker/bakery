'use client';
import { useState } from 'react';
import { categories, products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CakeModal3D from '@/components/CakeModal3D';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Filter, Grid, ArrowRight } from 'lucide-react';

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProductFor3D, setSelectedProductFor3D] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleOpen3D = (product: Product) => {
    setSelectedProductFor3D(product);
    setIsModalOpen(true);
  };

  return (
    <section id="products" className="py-20 md:py-28 px-4 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-honey/40 text-xs font-semibold uppercase tracking-[3px] text-amber mb-4 shadow-sm">
            <Sparkles size={14} className="text-honey" />
            Curated Bakery Masterpieces
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl text-espresso font-semibold">
            Signature <span className="italic honey-gradient-text">Cake Collection</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mt-4 text-base font-light leading-relaxed">
            From intimate birthday celebrations to opulent wedding tiers — explore our 100% eggless artisan creations, each handcrafted with pure raw honey and Belgian chocolate.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-amber text-white shadow-honey font-semibold'
                : 'glass-panel text-espresso hover:border-amber/60'
            }`}
          >
            ✨ All Creations ({products.length})
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-amber text-white shadow-honey font-semibold'
                    : 'glass-panel text-espresso hover:border-amber/60'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? 'bg-white/25 text-white' : 'bg-honey/20 text-amber-dark'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                onOpen3D={handleOpen3D}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Category Collections Showcase Banner */}
        <div className="mt-20 pt-16 border-t border-honey/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs uppercase tracking-[2px] text-amber font-semibold">Explore By Occasion</span>
              <h3 className="font-fraunces text-2xl md:text-3xl text-espresso font-semibold">
                Browse Dedicated Galleries
              </h3>
            </div>
            <Link
              href="/#customizer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber hover:text-amber-dark transition-colors group"
            >
              Need a bespoke customized shape? Try our Studio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="glass-panel p-5 rounded-2xl text-center hover:shadow-honey hover:-translate-y-1 transition-all group flex flex-col items-center justify-center border border-honey/30 bg-white/70"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="font-fraunces text-sm font-semibold text-espresso group-hover:text-amber transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3D & AR Modal */}
      <CakeModal3D
        product={selectedProductFor3D}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
