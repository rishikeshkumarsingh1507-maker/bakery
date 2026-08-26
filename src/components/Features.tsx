'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Box, Award, Heart, Utensils } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: '100% Eggless Pure',
    desc: 'Every single cake, pastry, and glaze is strictly 100% eggless — without ever sacrificing velvety moisture or delicate crumb.',
    tag: 'Pure Veg',
  },
  {
    icon: Sparkles,
    title: 'Raw Rooftop Honey',
    desc: 'Extracted naturally from our three rooftop hives in Rishikesh, bringing floral Himalayan nectar into every artisan batch.',
    tag: 'Organic',
  },
  {
    icon: Box,
    title: '3D WebAR Preview',
    desc: 'Inspect your centerpiece in 3D and augmented reality before baking. Experience every angle, tier, and delicate rosette.',
    tag: 'Interactive',
  },
  {
    icon: Award,
    title: 'Belgian & French Craft',
    desc: 'Crafted with premium Callebaut Belgian chocolate, French butter, and genuine Madagascar bourbon vanilla pods.',
    tag: 'Gourmet',
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-honey/40 text-xs font-semibold uppercase tracking-[3px] text-amber mb-4 shadow-sm">
            <Utensils size={14} className="text-honey" />
            The Artisan Standards
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl text-espresso font-semibold">
            Crafted with <span className="italic honey-gradient-text">Uncompromising Detail</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto mt-4 text-base font-light leading-relaxed">
            We don’t cut corners. From ingredient sourcing to final hand-piped golden drizzles, every detail is deliberate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl hover:shadow-honey-lg hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between group border border-honey/30 bg-white/75"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF5DC] to-[#FCECC4] border border-honey/30 flex items-center justify-center text-amber group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber group-hover:to-honey group-hover:text-white transition-all duration-300 shadow-sm">
                    <f.icon size={26} />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber bg-honey/15 px-2.5 py-1 rounded-full">
                    {f.tag}
                  </span>
                </div>

                <h3 className="font-fraunces text-xl font-semibold text-espresso mb-3 group-hover:text-amber transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-honey/15 flex items-center gap-1.5 text-xs text-amber font-medium">
                <span>✦ Verified standard</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
