'use client';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function About() {
  const stats = [
    { num: '100%', label: 'Eggless Guarantee', sub: 'No compromise on crumb or taste' },
    { num: '3', label: 'Rooftop Hives', sub: 'Harvested raw twice a year in Rishikesh' },
    { num: '15K+', label: 'Celebration Cakes', sub: 'Handcrafted with bespoke love' },
    { num: '5+', label: 'Years of Craft', sub: 'Serving Rishikesh & Himalayan valley' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-4 md:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column with Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-honey/30">
              <img
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=85"
                alt="Bakery Artisan Kitchen"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/20 to-transparent" />

              {/* Floating Rooftop Hive Callout */}
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-2xl border border-white/40 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber to-honey text-white flex items-center justify-center font-fraunces text-2xl font-bold shrink-0 shadow-honey">
                    🍯
                  </div>
                  <div>
                    <h4 className="font-fraunces text-lg font-semibold text-espresso">
                      From Our Three Rooftop Hives
                    </h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed font-light">
                      Raw Himalayan nectar harvested naturally twice a year — drizzled over our laminated pastry layers and signature honey cakes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent background glow */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-honey/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          </motion.div>

          {/* Right Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-honey/40 text-xs font-semibold uppercase tracking-[3px] text-amber mb-4 shadow-sm">
              <Sparkles size={14} className="text-honey" />
              The Art &amp; Hearth
            </div>

            <h2 className="font-fraunces text-3xl sm:text-4xl md:text-5xl text-espresso font-semibold leading-tight mb-6">
              Where Himalayan flora meets <span className="italic honey-gradient-text">French patisserie</span>.
            </h2>

            <div className="space-y-4 text-text-muted text-base font-light leading-relaxed mb-8">
              <p>
                What began in 2020 as an obsessive pursuit for the perfect eggless sponge has evolved into Rishikesh’s most celebrated artisan bakery. At <span className="font-medium text-espresso">Bakery</span>, we believe that removing eggs should never mean compromising on silkiness, moisture, or grandeur.
              </p>
              <p>
                Every celebration cake is an architectural canvas. We balance rich Belgian chocolate and Madagascar vanilla with raw honey infused straight from our rooftop hives, finishing every piece with hand-piped florals, edible gold, or modern geometric glazes.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-honey/25">
              {stats.map((s) => (
                <div key={s.label} className="p-4 rounded-2xl glass-panel border border-honey/25 bg-white/60">
                  <div className="font-fraunces text-2xl sm:text-3xl font-bold text-amber">
                    {s.num}
                  </div>
                  <div className="text-xs font-semibold text-espresso uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-text-muted font-light mt-0.5">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
