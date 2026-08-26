'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Box, Check, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import type { Product } from '@/data/products';

interface CakeModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CakeModal3D({ product, isOpen, onClose }: CakeModalProps) {
  const [selectedWeight, setSelectedWeight] = useState('1 Kg');
  const [selectedTier, setSelectedTier] = useState('Single Tier');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto slow rotate presentation
  useEffect(() => {
    if (!isOpen || !isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen, isRotating]);

  if (!product) return null;

  const basePrice = product.price;
  const weightMultiplier = selectedWeight === '0.5 Kg' ? 0.6 : selectedWeight === '1.5 Kg' ? 1.45 : selectedWeight === '2 Kg' ? 1.9 : 1.0;
  const calculatedPrice = Math.round(basePrice * weightMultiplier);

  const waOrderLink = `https://wa.me/919870612015?text=${encodeURIComponent(
    `Hi Bakery! I would like to order:\n\n🎂 Cake: ${product.name}\n⚖️ Weight: ${selectedWeight}\n🍰 Style: ${selectedTier}\n💰 Estimated Price: ₹${calculatedPrice.toLocaleString('en-IN')}\n\nPlease confirm availability!`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2A160A]/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#FFFDF8] rounded-3xl shadow-2xl border border-honey/30 overflow-hidden z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-honey/20 flex items-center justify-center text-espresso hover:bg-honey hover:text-white transition-all shadow-sm"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Visualizer & 3D Interactive Stage */}
              <div className="relative bg-gradient-to-b from-[#FFF5DC] to-[#FCECC4] p-8 flex flex-col items-center justify-center min-h-[360px] md:min-h-[500px] border-b md:border-b-0 md:border-r border-honey/20">
                {/* Honey glow ambient spotlight */}
                <div className="absolute w-[280px] h-[280px] bg-honey/25 rounded-full blur-3xl pointer-events-none" />

                {/* 100% Eggless Pill */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-sm border border-honey/30 text-xs font-semibold text-amber-dark tracking-wide uppercase shadow-sm">
                  <ShieldCheck size={14} className="text-amber" />
                  100% Eggless Artisan
                </div>

                {/* Interactive Product Image Preview */}
                <div
                  className="relative z-10 w-full max-w-[280px] h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                  onMouseEnter={() => setIsRotating(false)}
                  onMouseLeave={() => setIsRotating(true)}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[240px] max-h-[240px] object-contain drop-shadow-[0_20px_35px_rgba(74,52,16,0.25)] rounded-2xl select-none"
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Soft breathing shadow beneath cake */}
                <div className="w-[180px] h-[16px] bg-espresso/15 rounded-full blur-md mt-2" />

                {/* AR / 3D External WebAR Link Button */}
                {product.threeDLink && (
                  <a
                    href={product.threeDLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 hover:bg-white text-espresso rounded-full text-xs font-semibold tracking-wide border border-honey/40 shadow-sm hover:shadow transition-all"
                  >
                    <Box size={16} className="text-amber" />
                    Launch Full 3D WebAR Experience
                    <span className="text-[10px] bg-honey/20 text-amber-dark px-1.5 py-0.5 rounded font-mono">AR</span>
                  </a>
                )}
              </div>

              {/* Right Column: Cake Details & Customization */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-[2px] text-amber font-semibold">
                      {product.category.toUpperCase()} COLLECTION
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-honey/20 text-espresso text-[10px] font-bold tracking-wider uppercase">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="font-fraunces text-2xl md:text-3xl text-espresso font-semibold mb-3">
                    {product.name}
                  </h2>

                  <p className="text-text-muted text-sm leading-relaxed mb-6 font-light">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="p-3 bg-honey-100/60 rounded-xl border border-honey/20 flex items-center gap-2.5">
                      <Sparkles size={16} className="text-amber shrink-0" />
                      <span className="text-xs font-medium text-espresso">Raw Rooftop Honey Infused</span>
                    </div>
                    <div className="p-3 bg-honey-100/60 rounded-xl border border-honey/20 flex items-center gap-2.5">
                      <Heart size={16} className="text-amber shrink-0" />
                      <span className="text-xs font-medium text-espresso">Freshly Baked To Order</span>
                    </div>
                  </div>

                  {/* Weight Selector */}
                  <div className="mb-5">
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2.5">
                      Select Size / Weight
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['0.5 Kg', '1 Kg', '1.5 Kg', '2 Kg'].map((weight) => (
                        <button
                          key={weight}
                          type="button"
                          onClick={() => setSelectedWeight(weight)}
                          className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all ${
                            selectedWeight === weight
                              ? 'bg-amber text-white border-amber shadow-sm'
                              : 'bg-white text-espresso border-honey/30 hover:border-amber'
                          }`}
                        >
                          {weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Tier */}
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-2.5">
                      Tier Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Single Tier', 'Double Tier (+₹400)'].map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSelectedTier(tier)}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border text-left transition-all ${
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
                </div>

                {/* Pricing & CTA */}
                <div className="pt-5 border-t border-honey/20 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-text-muted uppercase tracking-wider block">Total Estimated</span>
                    <div className="font-fraunces text-2xl md:text-3xl font-bold text-espresso">
                      ₹{(calculatedPrice + (selectedTier.includes('Double') ? 400 : 0)).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <a
                    href={waOrderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-[230px] py-3.5 px-5 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white font-medium text-sm rounded-2xl shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
