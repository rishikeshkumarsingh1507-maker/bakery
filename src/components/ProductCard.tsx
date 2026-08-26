'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, MessageCircle, Sparkles, ShieldCheck, ChevronUp, ChevronDown, Check, X, Calendar, PenTool } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState('1 Kg');
  const [selectedTier, setSelectedTier] = useState('Single Tier');
  const [nameOnCake, setNameOnCake] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');

  const basePrice = product.price;
  const weightMultiplier =
    selectedWeight === '0.5 Kg' ? 0.6 : selectedWeight === '1.5 Kg' ? 1.45 : selectedWeight === '2 Kg' ? 1.9 : 1.0;
  const tierExtra = selectedTier.includes('Double') ? 400 : 0;
  const calculatedPrice = Math.round(basePrice * weightMultiplier + tierExtra);

  const waOrderLink = `https://wa.me/919521832344?text=${encodeURIComponent(
    `🌸 *New Cake Order — Bakery*\n\n` +
      `🎂 *Cake:* ${product.name}\n` +
      `⚖️ *Weight:* ${selectedWeight}\n` +
      `🍰 *Style:* ${selectedTier}\n` +
      (nameOnCake ? `✍️ *Custom Inscription/Name:* "${nameOnCake}"\n` : '') +
      (eventDate ? `📅 *Celebration Date:* ${eventDate}\n` : '') +
      (notes ? `📝 *Special Notes:* ${notes}\n` : '') +
      `\n💰 *Total Price:* ₹${calculatedPrice.toLocaleString('en-IN')}\n` +
      `✦ 100% Eggless Artisan Cake\n\n` +
      `Please confirm availability & delivery time!`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="glass-panel rounded-3xl overflow-hidden hover:shadow-glass-hover transition-all duration-500 flex flex-col justify-between group border border-honey/30 bg-white/80"
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

      {/* Inline Order Template Accordion */}
      <AnimatePresence>
        {isOrderOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#FFFDF7] border-t border-honey/25 px-5 py-5 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-honey/20">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber" />
                <span className="font-fraunces text-sm font-semibold text-espresso">
                  Customize &amp; Order
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOrderOpen(false)}
                className="text-text-muted hover:text-espresso text-xs flex items-center gap-1 font-medium"
              >
                <X size={14} />
                Close
              </button>
            </div>

            {/* Weight Options */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Select Weight
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {['0.5 Kg', '1 Kg', '1.5 Kg', '2 Kg'].map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`py-1.5 px-1 text-xs rounded-xl border transition-all ${
                      selectedWeight === weight
                        ? 'bg-amber text-white border-amber font-semibold shadow-xs'
                        : 'bg-white text-espresso border-honey/30 hover:border-amber'
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier Options */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1.5">
                Tier Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Single Tier', 'Double Tier (+₹400)'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`py-1.5 px-2 text-xs rounded-xl border text-center transition-all ${
                      selectedTier === tier
                        ? 'bg-amber/15 text-espresso border-amber font-semibold'
                        : 'bg-white text-text-muted border-honey/30 hover:border-amber'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Name / Inscription input */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1 flex items-center gap-1">
                <PenTool size={12} className="text-amber" />
                Name on Cake (Optional)
              </label>
              <input
                type="text"
                value={nameOnCake}
                onChange={(e) => setNameOnCake(e.target.value)}
                placeholder="e.g. Happy Birthday Rhea!"
                className="w-full px-3 py-2 text-xs rounded-xl border border-honey/30 bg-white text-espresso focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1 flex items-center gap-1">
                <Calendar size={12} className="text-amber" />
                Celebration Date (Optional)
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-honey/30 bg-white text-espresso focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
              />
            </div>

            {/* Send WhatsApp CTA */}
            <div className="pt-2">
              <a
                href={waOrderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white font-medium text-xs rounded-xl shadow-honey hover:shadow-honey-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle size={16} />
                Send Order for ₹{calculatedPrice.toLocaleString('en-IN')} on WhatsApp
              </a>
              <p className="text-[10px] text-center text-text-muted mt-1.5">
                Direct WhatsApp booking to +91 95218 32344
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {/* Toggle Order Template Button */}
          <button
            type="button"
            onClick={() => setIsOrderOpen(!isOrderOpen)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 transition-all ${
              isOrderOpen
                ? 'bg-espresso text-white'
                : 'bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white'
            }`}
          >
            <MessageCircle size={15} />
            {isOrderOpen ? 'Close' : 'Order'}
            {isOrderOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
