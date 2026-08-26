'use client';
import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // --- Gradient orbs expand & shift on scroll ---
  const orb1Scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const orb1Opacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.35]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const orb2Scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const orb2Opacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.3]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const orb3Scale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);
  const orb3Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0.25]);

  // --- Background warmth intensifies ---
  const warmOverlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]);

  // --- Shimmer line reveals ---
  const shimmerOpacity = useTransform(scrollYProgress, [0.2, 0.6, 1], [0, 0.3, 0.5]);
  const shimmerY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // --- Particle generation ---
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 8,
        startY: `${Math.random() * 100}%`,
      })),
    []
  );

  const particleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.4, 0.6, 0.8]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* === Gradient Orbs === */}
      <motion.div
        style={{ scale: orb1Scale, opacity: orb1Opacity, y: orb1Y }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold rounded-full blur-3xl"
      />
      <motion.div
        style={{ scale: orb2Scale, opacity: orb2Opacity, x: orb2X }}
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent rounded-full blur-3xl"
      />
      <motion.div
        style={{ scale: orb3Scale, opacity: orb3Opacity }}
        className="absolute top-[30%] left-[40%] w-[350px] h-[350px] bg-primary-light rounded-full blur-3xl"
      />

      {/* === Warm color overlay intensifies on scroll === */}
      <motion.div
        style={{ opacity: warmOverlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-accent/30"
      />

      {/* === Shimmer lines === */}
      <motion.div
        style={{ opacity: shimmerOpacity, y: shimmerY }}
        className="absolute inset-0 flex flex-col justify-center gap-16"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-light/20 to-transparent" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </motion.div>

      {/* === Floating golden particles === */}
      <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              bottom: p.startY,
            }}
            animate={{
              y: [0, -120, -240, -360],
              opacity: [0, 0.8, 0.4, 0],
              scale: [0.5, 1, 1.5, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* === Edge vignette for depth === */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#2D1810]/5" />
    </div>
  );
}
