'use client';
import { MessageCircle, Instagram } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <aside aria-label="Quick contact shortcuts" className="fixed bottom-6 right-6 z-[990] flex flex-col gap-3">
      {/* Instagram Floating Icon */}
      <a
        href="https://instagram.com/bonbon.rishikesh"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all text-white border border-white/20"
        style={{
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        }}
        aria-label="Follow Bakery on Instagram"
      >
        <Instagram size={22} />
      </a>

      {/* WhatsApp Floating Icon */}
      <a
        href="https://wa.me/919870612015?text=Hi%20Bakery!%20I%27d%20like%20to%20inquire%20about%20a%20cake"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-honey-lg hover:scale-110 transition-all border border-white/30 group"
        aria-label="Chat with Bakery on WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
      </a>
    </aside>
  );
}
