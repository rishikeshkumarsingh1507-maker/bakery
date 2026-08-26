'use client';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-7 w-10 h-10 bg-white/90 backdrop-blur-md text-espresso border border-honey/40 rounded-full flex items-center justify-center z-[980] shadow-glass hover:bg-amber hover:text-white hover:border-amber hover:-translate-y-1 transition-all"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
