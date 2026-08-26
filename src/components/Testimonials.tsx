'use client';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { Star, Heart, CheckCircle2, Sparkles, Quote } from 'lucide-react';

export default function Testimonials() {
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
            <Heart size={14} className="text-honey" />
            Client Reverie
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl text-espresso font-semibold">
            Love Letters &amp; <span className="italic honey-gradient-text">Celebrations</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto mt-4 text-base font-light leading-relaxed">
            Read what our patrons in Rishikesh and destination wedding hosts have to say about their custom creations.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-panel p-8 md:p-9 rounded-3xl hover:shadow-honey-lg hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between border border-honey/30 bg-white/80 relative"
            >
              <div className="absolute top-6 right-6 text-honey/30 pointer-events-none">
                <Quote size={40} />
              </div>

              <div>
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-honey text-amber" />
                  ))}
                  <span className="text-xs text-text-muted font-medium ml-2">5.0 Star</span>
                </div>

                {/* Review Text */}
                <p className="font-fraunces text-base sm:text-lg leading-relaxed text-espresso italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-honey/20 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber to-honey text-white flex items-center justify-center font-fraunces text-lg font-bold shadow-honey shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-fraunces text-base font-semibold text-espresso flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 size={14} className="text-amber shrink-0" />
                  </div>
                  <div className="text-xs text-text-muted font-light">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
