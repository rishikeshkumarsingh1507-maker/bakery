'use client';
import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { categories } from '@/data/products';

export default function Footer() {
  return (
    <footer className="bg-[#2A160A] text-[#FFF7E4] pt-20 pb-10 px-4 md:px-16 relative overflow-hidden border-t border-honey/20">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-honey/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 relative z-10">
        {/* Brand Column (5 Cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber to-honey flex items-center justify-center shadow-honey shrink-0">
              <span className="text-white text-xs font-bold font-fraunces">B</span>
            </div>
            <div className="font-fraunces text-2xl font-semibold text-white tracking-tight">
              Bakery
            </div>
          </div>

          <p className="text-xs uppercase tracking-[3px] text-honey font-semibold">
            100% Eggless Patisserie
          </p>

          <p className="text-sm text-white/70 leading-relaxed max-w-sm font-light">
            Crafting architectural celebration cakes and raw rooftop honey pastries in Rishikesh. Every creation is 100% pure eggless, baked with passion and served with love.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://instagram.com/bonbon.rishikesh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-honey hover:text-espresso text-white flex items-center justify-center transition-all border border-white/10"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com/bonbon.rishikesh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-honey hover:text-espresso text-white flex items-center justify-center transition-all border border-white/10"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://wa.me/919521832344"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-honey hover:text-espresso text-white flex items-center justify-center transition-all border border-white/10"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links (3 Cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-fraunces text-lg text-honey font-semibold">Cakes &amp; Studio</h4>
          <ul className="space-y-2 text-sm text-white/70 font-light">
            <li>
              <Link href="/#products" className="hover:text-honey transition-colors">
                All Signature Cakes
              </Link>
            </li>
            <li>
              <Link href="/#customizer" className="hover:text-honey transition-colors">
                Bespoke Cake Studio
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={`/category/${cat.id}`} className="hover:text-honey transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column (4 Cols) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-fraunces text-lg text-honey font-semibold">Atelier &amp; Orders</h4>
          <ul className="space-y-3 text-sm text-white/70 font-light">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-honey shrink-0 mt-0.5" />
              <span>Tulsi Vihar 2, Rishikesh, Uttarakhand 249302</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-honey shrink-0" />
              <a href="tel:+919521832344" className="hover:text-honey transition-colors">
                +91 95218 32344
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-honey shrink-0" />
              <a href="mailto:hello@bonbonbakery.in" className="hover:text-honey transition-colors">
                hello@bonbonbakery.in
              </a>
            </li>
          </ul>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="text-xs text-white/40 hover:text-honey transition-colors inline-flex items-center gap-1"
            >
              Bakery Administration Dashboard →
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 relative z-10">
        <p>
          &copy; {new Date().getFullYear()} Bakery. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5">
          <span>Handcrafted with</span>
          <Heart size={14} className="text-honey fill-honey" />
          <span>and raw Himalayan honey</span>
        </p>
      </div>
    </footer>
  );
}
