'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Crown, Layers, Palette, Wand2, Check } from 'lucide-react';

const OCCASIONS = [
  { id: 'birthday', label: 'Birthday Celebration', emoji: '🎂', baseMultiplier: 1.0 },
  { id: 'anniversary', label: 'Anniversary Milestone', emoji: '🥂', baseMultiplier: 1.1 },
  { id: 'wedding', label: 'Wedding & Bridal', emoji: '👰', baseMultiplier: 1.35 },
  { id: 'specialty', label: 'Showstopper / Theme', emoji: '✨', baseMultiplier: 1.25 },
];

const SIZES = [
  { id: '1kg', label: 'Single Tier (1.0 Kg)', guests: '6 - 8 servings', basePrice: 1500 },
  { id: '2kg', label: 'Two Tiers (2.0 Kg)', guests: '14 - 18 servings', basePrice: 2800 },
  { id: '3.5kg', label: 'Grand 3-Tier (3.5 Kg)', guests: '25 - 32 servings', basePrice: 4600 },
];

const FLAVOURS = [
  { id: 'belgian-truffle', name: 'Belgian Dark Truffle', desc: '54% dark chocolate ganache, moist cocoa sponge', tag: 'Bestseller', extra: 0 },
  { id: 'honey-lavender', name: 'Rooftop Honey & Lavender', desc: 'Raw floral honey infusion with organic lavender cream', tag: 'Signature', extra: 200 },
  { id: 'biscoff-caramel', name: 'Lotus Biscoff & Salted Caramel', desc: 'Biscoff spread, speculoos crunch, amber caramel', tag: 'Popular', extra: 150 },
  { id: 'rose-pistachio', name: 'Rose Petal & Pistachio', desc: 'Persian rose water, crushed pistachio crumb', tag: 'Artisan', extra: 250 },
  { id: 'red-velvet', name: 'Velvet Dream Cream Cheese', desc: 'Classic velvety crumb, smooth Madagascar cream cheese', tag: 'Classic', extra: 100 },
  { id: 'vanilla-berry', name: 'Madagascar Vanilla & Fresh Berries', desc: 'Pure Bourbon vanilla sponge with berry compote', tag: 'Fresh', extra: 150 },
];

const ACCENTS = [
  { id: 'gold-leaf', name: '24K Edible Gold Leaf', price: 300, icon: '✨' },
  { id: 'honeycomb-drizzle', name: 'Raw Honeycomb Chunk & Nectar', price: 250, icon: '🍯' },
  { id: 'macaron-topper', name: 'Artisan French Macarons (4pcs)', price: 250, icon: '🧁' },
  { id: 'fresh-flowers', name: 'Organic Edible Flowers & Rosettes', price: 350, icon: '🌸' },
];

export default function BespokeCustomizer() {
  const [occasion, setOccasion] = useState(OCCASIONS[0].id);
  const [size, setSize] = useState(SIZES[0].id);
  const [flavour, setFlavour] = useState(FLAVOURS[1].id);
  const [selectedAccents, setSelectedAccents] = useState<string[]>(['honeycomb-drizzle']);
  const [customName, setCustomName] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  const toggleAccent = (id: string) => {
    setSelectedAccents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculatedEstimate = useMemo(() => {
    const occObj = OCCASIONS.find((o) => o.id === occasion) || OCCASIONS[0];
    const sizeObj = SIZES.find((s) => s.id === size) || SIZES[0];
    const flavObj = FLAVOURS.find((f) => f.id === flavour) || FLAVOURS[0];

    const accentsTotal = selectedAccents.reduce((acc, currId) => {
      const found = ACCENTS.find((a) => a.id === currId);
      return acc + (found ? found.price : 0);
    }, 0);

    const subtotal = (sizeObj.basePrice + flavObj.extra) * occObj.baseMultiplier + accentsTotal;
    return Math.round(subtotal / 50) * 50; // Round to nearest 50
  }, [occasion, size, flavour, selectedAccents]);

  const occObj = OCCASIONS.find((o) => o.id === occasion) || OCCASIONS[0];
  const sizeObj = SIZES.find((s) => s.id === size) || SIZES[0];
  const flavObj = FLAVOURS.find((f) => f.id === flavour) || FLAVOURS[0];
  const accentNames = selectedAccents
    .map((id) => ACCENTS.find((a) => a.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const waLink = `https://wa.me/919521832344?text=${encodeURIComponent(
    `✨ *Custom Cake Bespoke Request* — Bakery\n\n` +
      `🎉 *Occasion:* ${occObj.label}\n` +
      `🎂 *Size/Tiers:* ${sizeObj.label} (${sizeObj.guests})\n` +
      `🍓 *Flavour:* ${flavObj.name}\n` +
      `✨ *Artisan Accents:* ${accentNames || 'None'}\n` +
      (customName ? `✍️ *Custom Name/Text:* "${customName}"\n` : '') +
      (specialNote ? `📝 *Special Notes:* ${specialNote}\n` : '') +
      `\n💰 *Estimated Quote:* ₹${calculatedEstimate.toLocaleString('en-IN')}\n\n` +
      `Please let me know if we can schedule this bespoke order!`
  )}`;

  return (
    <section id="customizer" className="py-20 md:py-28 px-4 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-honey/40 text-xs font-semibold uppercase tracking-[3px] text-amber mb-4 shadow-sm">
            <Crown size={14} className="text-honey" />
            Artisan Bespoke Studio
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl text-espresso font-semibold">
            Design Your <span className="italic honey-gradient-text">Signature Cake</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mt-4 text-base font-light leading-relaxed">
            Customize every tier, flavor, and finish. Handcrafted 100% eggless with raw rooftop honey and pure passion in Rishikesh.
          </p>
        </motion.div>

        {/* Interactive Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (8 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Occasion */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-honey/20 text-amber flex items-center justify-center text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="font-fraunces text-xl text-espresso font-semibold">Select the Occasion</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccasion(occ.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      occasion === occ.id
                        ? 'bg-amber text-white border-amber shadow-honey'
                        : 'bg-white/80 text-espresso border-honey/30 hover:border-amber/60'
                    }`}
                  >
                    <span className="text-2xl">{occ.emoji}</span>
                    <span className="text-xs font-medium leading-tight">{occ.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size & Tier */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-honey/20 text-amber flex items-center justify-center text-xs font-bold font-mono">
                  2
                </span>
                <h3 className="font-fraunces text-xl text-espresso font-semibold">Tiers &amp; Weight</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SIZES.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSize(sz.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      size === sz.id
                        ? 'bg-amber text-white border-amber shadow-honey'
                        : 'bg-white/80 text-espresso border-honey/30 hover:border-amber/60'
                    }`}
                  >
                    <div className="font-fraunces text-base font-semibold">{sz.label}</div>
                    <div className={`text-xs mt-1 ${size === sz.id ? 'text-white/80' : 'text-text-muted'}`}>
                      {sz.guests}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Gourmet Flavor */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-honey/20 text-amber flex items-center justify-center text-xs font-bold font-mono">
                  3
                </span>
                <h3 className="font-fraunces text-xl text-espresso font-semibold">Signature Flavour</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLAVOURS.map((fl) => (
                  <button
                    key={fl.id}
                    type="button"
                    onClick={() => setFlavour(fl.id)}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                      flavour === fl.id
                        ? 'bg-gradient-to-br from-amber to-honey-700 text-white border-amber shadow-honey'
                        : 'bg-white/80 text-espresso border-honey/30 hover:border-amber/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-fraunces text-sm font-semibold">{fl.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                          flavour === fl.id ? 'bg-white/20 text-white' : 'bg-honey/20 text-amber-dark'
                        }`}
                      >
                        {fl.tag}
                      </span>
                    </div>
                    <p className={`text-xs mt-1.5 leading-relaxed font-light ${flavour === fl.id ? 'text-white/85' : 'text-text-muted'}`}>
                      {fl.desc}
                    </p>
                    {fl.extra > 0 && (
                      <span className={`text-[11px] font-medium block mt-2 ${flavour === fl.id ? 'text-amber-light' : 'text-amber'}`}>
                        +₹{fl.extra}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Accents & Inscription */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-honey/20 text-amber flex items-center justify-center text-xs font-bold font-mono">
                  4
                </span>
                <h3 className="font-fraunces text-xl text-espresso font-semibold">Artisan Finishes &amp; Note</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {ACCENTS.map((acc) => {
                  const isChecked = selectedAccents.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => toggleAccent(acc.id)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                        isChecked
                          ? 'bg-honey-100/90 border-amber text-espresso font-medium shadow-sm'
                          : 'bg-white/70 border-honey/30 text-text-muted hover:border-amber/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{acc.icon}</span>
                        <div>
                          <div className="text-xs text-espresso font-semibold">{acc.name}</div>
                          <div className="text-[11px] text-amber">+₹{acc.price}</div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          isChecked ? 'bg-amber border-amber text-white' : 'border-honey/40 bg-white'
                        }`}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5 font-medium">
                    Hand-Lettered Inscription (Optional)
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g. Happy 30th Birthday Rhea!"
                    className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white/90 text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5 font-medium">
                    Color Palette / Design Vision
                  </label>
                  <input
                    type="text"
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="e.g. Pastel blush pink, gold dripping, minimalist floral"
                    className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white/90 text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Order Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-honey-lg border border-honey/40 relative overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FFF9ED] to-[#FDF4DF]">
              {/* Decorative Honeycomb Corner Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-honey/30 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-5 border-b border-honey/25 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-[2px] text-amber font-semibold">Your Creation</span>
                  <h3 className="font-fraunces text-2xl text-espresso font-semibold">Bespoke Summary</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-honey/20 flex items-center justify-center text-amber">
                  <Wand2 size={20} />
                </div>
              </div>

              {/* Recipe breakdown */}
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between items-center py-1.5 border-b border-honey/15">
                  <span className="text-text-muted">Occasion</span>
                  <span className="font-medium text-espresso flex items-center gap-1.5">
                    {occObj.emoji} {occObj.label}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-honey/15">
                  <span className="text-text-muted">Tiers &amp; Weight</span>
                  <span className="font-medium text-espresso">{sizeObj.label}</span>
                </div>
                <div className="flex justify-between items-start py-1.5 border-b border-honey/15">
                  <span className="text-text-muted">Flavour</span>
                  <span className="font-medium text-espresso text-right max-w-[200px]">{flavObj.name}</span>
                </div>
                <div className="flex justify-between items-start py-1.5 border-b border-honey/15">
                  <span className="text-text-muted">Artisan Finishes</span>
                  <span className="font-medium text-espresso text-right max-w-[200px]">
                    {accentNames || 'Standard Signature Finish'}
                  </span>
                </div>
                {customName && (
                  <div className="flex justify-between items-center py-1.5 border-b border-honey/15">
                    <span className="text-text-muted">Piped Text</span>
                    <span className="font-medium text-amber italic">&ldquo;{customName}&rdquo;</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1.5 border-b border-honey/15 text-xs text-amber-dark">
                  <span>Guarantee</span>
                  <span className="font-bold">✦ 100% Pure Eggless</span>
                </div>
              </div>

              {/* Total & Instant CTA */}
              <div className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-honey/30 mb-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-text-muted uppercase tracking-wider block">Estimated Price</span>
                    <span className="text-[11px] text-text-muted font-light">Includes handcrafted finishes</span>
                  </div>
                  <div className="text-right">
                    <div className="font-fraunces text-3xl font-bold text-espresso">
                      ₹{calculatedEstimate.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white font-medium text-base rounded-2xl shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 text-center group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                Order This Custom Cake on WhatsApp
              </a>

              <p className="text-center text-[11px] text-text-muted mt-3 font-light">
                ⚡ Direct chat with our head pastry chef in Rishikesh to confirm timing &amp; details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
