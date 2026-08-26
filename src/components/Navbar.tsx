'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '@/data/products';
import { Sparkles, MessageCircle, Menu, X, ChevronDown, Wand2 } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '/#products' },
    { label: 'Bespoke Studio', href: '/#customizer' },
    { label: 'Our Story', href: '/#about' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Visit Us', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 px-4 md:px-12 ${
        scrolled
          ? 'py-3 bg-[#FFFDF8]/85 backdrop-blur-md shadow-glass border-b border-honey/20'
          : 'py-5 bg-transparent'
      }`}
      onMouseLeave={() => setProductsDropdown(false)}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber to-honey flex items-center justify-center shadow-honey shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-white text-xs font-bold font-fraunces">B</span>
          </div>
          <div className="flex flex-col leading-none">
            <div className="font-fraunces text-xl md:text-2xl font-semibold text-espresso tracking-tight">
              Bakery
            </div>
            <span className="text-[9px] tracking-[2.5px] uppercase text-amber-dark font-medium mt-0.5">
              100% Eggless Patisserie
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-espresso text-sm font-medium hover:text-amber transition-colors relative group py-1"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Cakes Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsDropdown(!productsDropdown)}
              onMouseEnter={() => setProductsDropdown(true)}
              className="text-espresso text-sm font-medium hover:text-amber transition-colors flex items-center gap-1.5 py-1"
            >
              Cakes
              <ChevronDown
                size={14}
                className={`text-text-muted transition-transform duration-200 ${productsDropdown ? 'rotate-180 text-amber' : ''}`}
              />
            </button>

            {productsDropdown && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#FFFDF8] rounded-2xl shadow-xl border border-honey/30 py-3 w-64 z-[1001] animate-in fade-in zoom-in-95 duration-200"
                onMouseLeave={() => setProductsDropdown(false)}
              >
                <Link
                  href="/#products"
                  onClick={() => setProductsDropdown(false)}
                  className="block px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber hover:bg-honey-100/60 transition-colors"
                >
                  ✨ View All Collections
                </Link>
                <div className="h-px bg-honey/20 my-1.5" />
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}`}
                    onClick={() => setProductsDropdown(false)}
                    className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-espresso hover:bg-honey-100/70 hover:text-amber transition-colors"
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span className="font-medium text-xs">{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-espresso text-sm font-medium hover:text-amber transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/#contact"
            className="px-6 py-2.5 bg-gradient-to-r from-amber to-honey-600 hover:from-amber-dark hover:to-amber text-white rounded-full text-xs font-semibold tracking-wide shadow-honey hover:shadow-honey-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            Order on WhatsApp
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-honey/30 flex items-center justify-center text-espresso"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#FFFDF8]/95 backdrop-blur-xl flex flex-col p-6 z-[999] md:hidden overflow-y-auto border-t border-honey/20">
          <nav className="flex flex-col gap-4 my-auto py-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-fraunces text-2xl text-espresso hover:text-amber"
            >
              Home
            </Link>
            <Link
              href="/#products"
              onClick={() => setMenuOpen(false)}
              className="font-fraunces text-2xl text-espresso hover:text-amber"
            >
              Cake Collections
            </Link>
            <div className="pl-4 border-l-2 border-honey/40 space-y-2 py-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-text-muted hover:text-amber py-1"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
            <Link
              href="/#customizer"
              onClick={() => setMenuOpen(false)}
              className="font-fraunces text-2xl text-espresso hover:text-amber flex items-center gap-2"
            >
              <Wand2 size={22} className="text-amber" />
              Bespoke Cake Studio
            </Link>
            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="font-fraunces text-2xl text-espresso hover:text-amber"
            >
              Our Story &amp; Rooftop Hives
            </Link>
            <Link
              href="/#gallery"
              onClick={() => setMenuOpen(false)}
              className="font-fraunces text-2xl text-espresso hover:text-amber"
            >
              Artisan Gallery
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="font-fraunces text-2xl text-espresso hover:text-amber"
            >
              Visit &amp; Contact
            </Link>
          </nav>

          <div className="pt-6 border-t border-honey/20 mt-auto">
            <a
              href="https://wa.me/919870612015?text=Hi%20Bakery!%20I%27d%20like%20to%20place%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-gradient-to-r from-amber to-honey text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-honey"
            >
              <MessageCircle size={18} />
              WhatsApp Quick Order
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
