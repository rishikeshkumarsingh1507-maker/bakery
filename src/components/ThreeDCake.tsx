'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Box, Crown } from 'lucide-react';

export default function ThreeDCake() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse-follow 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[440px] md:h-[560px] relative flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Honey Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] md:w-[480px] md:h-[480px] bg-gradient-radial from-honey/35 via-honey/15 to-transparent rounded-full blur-3xl animate-pulse-gentle" />
      </div>

      {/* 3D Floating Showcase Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 cursor-grab active:cursor-grabbing"
      >
        {/* Natural gentle bobbing animation */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex flex-col items-center"
        >
          {/* Glassmorphic Showcase Stage Frame */}
          <div className="p-3 md:p-4 rounded-3xl glass-panel shadow-honey-lg border border-honey/40 bg-white/70 backdrop-blur-md relative overflow-hidden">
            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-honey/30 text-[10px] font-bold text-amber tracking-wider uppercase shadow-sm">
              <Crown size={12} className="text-honey" />
              Masterpiece Tier
            </div>

            {/* Inner Image Container */}
            <div className="w-[280px] sm:w-[320px] md:w-[380px] h-[320px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden relative bg-gradient-to-b from-[#FFFDF7] to-[#FCECC4] flex items-center justify-center">
              <img
                src="/products/hero-cake.png"
                alt="Bakery Signature Masterpiece Cake"
                className="w-full h-full object-cover select-none transform group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Interactive Floating 3D Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-honey/40 shadow-honey flex items-center gap-2 text-xs font-semibold text-espresso">
              <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              <Box size={14} className="text-amber" />
              <span>Interactive 3D Stage</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Dynamic breathing shadow */}
      <motion.div
        animate={{
          scaleX: [1, 0.85, 1],
          opacity: [0.35, 0.18, 0.35],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[260px] md:w-[340px] h-[22px] bg-espresso/25 rounded-full blur-xl pointer-events-none z-0"
      />

      {/* Ambient Floating Honey Droplets */}
      <div className="absolute top-10 right-10 w-3.5 h-3.5 rounded-full bg-honey/40 blur-[0.5px] animate-pulse-gentle" />
      <div className="absolute bottom-16 left-12 w-2.5 h-2.5 rounded-full bg-amber/30 blur-[0.5px] animate-pulse-gentle" style={{ animationDelay: '1s' }} />
      <div className="absolute top-20 left-16 w-3 h-3 rounded-full bg-honey/30 blur-[0.5px] animate-pulse-gentle" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}
