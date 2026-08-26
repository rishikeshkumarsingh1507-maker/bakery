'use client';
import { motion } from 'framer-motion';
import { Box, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const waLink = `https://wa.me/919870612015?text=${encodeURIComponent(
    `Hi Bakery! I would like to order the *${product.name}* (₹${product.price.toLocaleString('en-IN')}). Please let me know availability!`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="glass-panel rounded-3xl overflow-hidden hover:shadow-glass-hover hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between group border border-honey/30 bg-white/75"
    >
      <div>
        {/* Clickable Image Container to 3D Link */}
        <a
          href={product.threeDLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-[260px] sm:h-[280px] overflow-hidden relative bg-gradient-to-br from-[#FFF5DC] to-[#F7E1B5] cursor-pointer"
        >
          {/* Top-Right Badge */}
          {product.badge && (
            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-amber z-10 border border-honey/30 shadow-sm uppercase">
              {product.badge}
            </span>
          )}

          {/* 100% Eggless Badge */}
          <span className="absolute top-4 left-4 bg-emerald-700/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-white z-10 uppercase shadow-sm flex items-center gap-1">
            <ShieldCheck size={12} />
            100% Eggless
          </span>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
          />

          {/* Hover Overlay with 3D Action */}
          <div className="absolute inset-0 bg-espresso/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <span className="px-4 py-2.5 bg-white text-espresso rounded-full text-xs font-semibold hover:bg-honey hover:text-white transition-all shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none">
              <Box size={16} className="text-amber" />
              View 3D Model
            </span>
          </div>
        </a>

        {/* Card Content */}
        <div className="p-6">
          <div className="text-[11px] uppercase tracking-[2px] text-amber font-semibold mb-1">
            {product.category}
          </div>
          <a
            href={product.threeDLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h3 className="font-fraunces text-xl md:text-2xl font-semibold text-espresso mb-2 group-hover:text-amber transition-colors">
              {product.name}
            </h3>
          </a>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4 font-light line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & Action Buttons */}
      <div className="p-6 pt-0 border-t border-honey/15 mt-auto flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-text-muted uppercase tracking-wider block">Starts at</span>
          <span className="text-xl md:text-2xl font-fraunces font-bold text-espresso">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct 3D Link Button */}
          <a
            href={product.threeDLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Open 3D Model"
            className="p-2.5 rounded-full bg-honey-100 border border-honey/40 text-espresso hover:bg-amber hover:text-white transition-all shadow-sm flex items-center justify-center"
          >
            <Box size={16} />
          </a>

          {/* Direct Order Button */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white rounded-full text-xs font-semibold shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle size={15} />
            Order
          </a>
        </div>
      </div>
    </motion.div>
  );
}
