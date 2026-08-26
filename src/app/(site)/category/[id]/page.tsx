'use client';
import { useState } from 'react';
import { products, categories, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CakeModal3D from '@/components/CakeModal3D';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = categories.find((c) => c.id === id);
  const catProducts = products.filter((p) => p.category === id);

  const [selectedProductFor3D, setSelectedProductFor3D] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!category || catProducts.length === 0) {
    notFound();
  }

  const handleOpen3D = (product: Product) => {
    setSelectedProductFor3D(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-16 relative z-10">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted">
          <Link href="/" className="hover:text-amber transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-amber transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-amber font-semibold">{category.name}</span>
        </div>
      </div>

      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-[#FFF5DC] to-[#FCECC4] border border-honey/40 flex items-center justify-center text-4xl shadow-honey">
          {category.emoji}
        </div>
        <h1 className="font-fraunces text-4xl md:text-5xl text-espresso font-semibold mb-3">
          {category.name}
        </h1>
        <p className="text-text-muted text-base font-light leading-relaxed">
          {category.description}
        </p>
        <div className="inline-flex items-center gap-2 mt-4 text-xs bg-white/80 backdrop-blur-sm border border-honey/30 px-4 py-1.5 rounded-full text-amber font-semibold shadow-sm">
          <ShieldCheck size={14} />
          {catProducts.length} {catProducts.length === 1 ? 'Design' : 'Designs'} · 100% Eggless
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {catProducts.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            onOpen3D={handleOpen3D}
          />
        ))}
      </div>

      {/* Back to Collections CTA */}
      <div className="text-center mt-20">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border border-honey/40 text-espresso rounded-full text-sm font-medium hover:bg-amber hover:text-white hover:border-amber transition-all shadow-sm hover:shadow-honey hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} />
          Back to All Collections
        </Link>
      </div>

      {/* 3D Inspect Modal */}
      <CakeModal3D
        product={selectedProductFor3D}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
