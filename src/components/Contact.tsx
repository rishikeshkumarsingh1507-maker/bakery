'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Sparkles, Check } from 'lucide-react';
import { products } from '@/data/products';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    cake: '',
    eventDate: '',
    message: '',
  });

  const info = [
    { icon: MapPin, label: 'Bakery Atelier', value: 'Tulsi Vihar 2, Rishikesh, Uttarakhand 249302' },
    { icon: Phone, label: 'Concierge & Direct Call', value: '+91 98706 12015' },
    { icon: Mail, label: 'Direct Inquiries', value: 'hello@bonbonbakery.in' },
    { icon: Clock, label: 'Operating Hours', value: 'Mon - Sun · 9:00 AM – 8:00 PM' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `🌸 *New Bakery Inquiry — Bakery*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📞 *Phone:* ${form.phone}\n` +
      `🎂 *Desired Cake / Category:* ${form.cake || 'Custom Bespoke Inquiry'}\n` +
      (form.eventDate ? `📅 *Celebration Date:* ${form.eventDate}\n` : '') +
      (form.message ? `📝 *Details / Notes:* ${form.message}\n` : '') +
      `\n✦ Please confirm booking & delivery availability!`;

    window.open(`https://wa.me/919870612015?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-honey/40 text-xs font-semibold uppercase tracking-[3px] text-amber mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Kitchen Open Today · 9 AM - 8 PM
          </div>
          <h2 className="font-fraunces text-3xl md:text-5xl text-espresso font-semibold">
            Visit Our Atelier &amp; <span className="italic honey-gradient-text">Place an Order</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto mt-4 text-base font-light leading-relaxed">
            Planning a celebration in Rishikesh or looking for a signature dessert? Walk into our bakery atelier or send a direct order request.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Info & Embedded Map */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="glass-panel p-5 rounded-2xl border border-honey/30 bg-white/80 hover:shadow-honey transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-honey-100 flex items-center justify-center text-amber mb-3 border border-honey/30">
                    <item.icon size={20} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-espresso leading-snug">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden h-[320px] shadow-glass border border-honey/30 relative">
              <iframe
                src="https://maps.google.com/maps?q=Tulsi+Vihar+Rishikesh+Uttarakhand+249302&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bakery Atelier Location"
              />
            </div>
          </div>

          {/* Right Column: Order Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-honey border border-honey/35 bg-white/85">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-fraunces text-2xl md:text-3xl font-semibold text-espresso">
                    Direct Order Concierge
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-light">
                    Submit your request and our head pastry chef will connect with you via WhatsApp.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-honey/20 flex items-center justify-center text-amber shrink-0">
                  <Sparkles size={20} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98706..."
                      className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                      Select Cake Design
                    </label>
                    <select
                      value={form.cake}
                      onChange={(e) => setForm({ ...form, cake: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                    >
                      <option value="">Select a cake...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} (₹{p.price})
                        </option>
                      ))}
                      <option value="Custom Bespoke Order">Custom Bespoke Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                      Celebration Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-muted font-medium mb-1.5">
                    Flavor, Inscription &amp; Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about flavors, custom lettering, dietary requests (always 100% eggless)..."
                    className="w-full px-4 py-3 rounded-xl border border-honey/30 bg-white text-espresso text-sm focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white font-medium text-base rounded-2xl shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Send Order Request on WhatsApp
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-text-muted mt-3">
                  <span className="flex items-center gap-1 text-amber">
                    <Check size={14} /> 100% Eggless
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber">
                    <Check size={14} /> Rooftop Raw Honey
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber">
                    <Check size={14} /> Instant WhatsApp Support
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
