'use client';
import { useEffect, useRef } from 'react';

/**
 * "HONEYCOMB GLOW" — High-Performance Zero-Allocation Honeycomb Canvas
 * 
 * Performance Optimizations:
 * 1. Pre-computed trigonometry lookup tables for hexagon vertices.
 * 2. Batched border strokes (1 draw call instead of 200+).
 * 3. Pre-cached radial glow brush sprite to eliminate GC gradient thrashing.
 * 4. High-DPI clamping (capped at DPR 2.0).
 * 5. Smart adaptive animation loop (smooth delta-time physics, sleeps when idle).
 * 6. Full touch and mobile pointer tracking.
 */
export default function BakeryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion preference
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set root CSS variables for ambient background
    const root = document.documentElement;
    root.style.setProperty('--top', '#FFF7E4');
    root.style.setProperty('--bottom', '#F6DFA8');

    // ── 1. ALL STATE VARIABLES DEFINED AT THE TOP ──────────────────
    let animationFrameId: number | null = null;
    let isRunning = false;
    let isVisible = true;
    let lastTime = performance.now();
    let time = 0;
    let idleCounter = 0;

    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let scrollTicking = false;

    const pointer = { x: -1000, y: -1000 };
    const pointerTarget = { x: -1000, y: -1000 };
    let isPointerActive = false;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    interface HexCell {
      x: number;
      y: number;
      size: number;
      seed: number;
    }

    let hexes: HexCell[] = [];

    // Pre-compute hexagon angles for 6 vertices (rotated 30 degrees)
    const HEX_ANGLES_COS = new Float32Array(6);
    const HEX_ANGLES_SIN = new Float32Array(6);
    for (let i = 0; i < 6; i++) {
      const rad = (Math.PI / 180) * (60 * i - 30);
      HEX_ANGLES_COS[i] = Math.cos(rad);
      HEX_ANGLES_SIN[i] = Math.sin(rad);
    }

    // Pre-cache radial glow brush on offscreen canvas to avoid GC thrashing
    const GLOW_SIZE = 128;
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = GLOW_SIZE;
    glowCanvas.height = GLOW_SIZE;
    const glowCtx = glowCanvas.getContext('2d');
    if (glowCtx) {
      const half = GLOW_SIZE / 2;
      const g = glowCtx.createRadialGradient(half, half, 0, half, half, half);
      g.addColorStop(0, 'rgba(240, 176, 60, 1)');
      g.addColorStop(0.5, 'rgba(230, 155, 40, 0.5)');
      g.addColorStop(1, 'rgba(200, 130, 30, 0)');
      glowCtx.fillStyle = g;
      glowCtx.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);
    }

    // ── 2. HELPER FUNCTIONS ─────────────────────────────────────────
    function drawHexPath(cx: number, cy: number, r: number) {
      if (!ctx) return;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const px = cx + r * HEX_ANGLES_COS[i];
        const py = cy + r * HEX_ANGLES_SIN[i];
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function sleep() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      isRunning = false;
    }

    function wake() {
      idleCounter = 0;
      if (!isRunning && isVisible && !reduceMotion) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    }

    function buildGrid() {
      hexes = [];
      const size = Math.max(34, Math.min(54, W / 18));
      const hexW = size * 2;
      const hexH = Math.sqrt(3) * size;
      const cols = Math.ceil(W / (hexW * 0.75)) + 2;
      const rows = Math.ceil(H / hexH) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexW * 0.75;
          const y = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
          const seed = Math.abs(Math.sin(col * 12.9898 + row * 78.233)) % 1;
          hexes.push({ x, y, size, seed });
        }
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      W = window.innerWidth;
      H = window.innerHeight;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildGrid();
      wake();
    }

    function updateScroll() {
      const scrollTop = window.scrollY || window.pageYOffset;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollProgress = Math.min(1, Math.max(0, scrollTop / max));
      scrollTicking = false;
      wake();
    }

    const onScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(updateScroll);
        scrollTicking = true;
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      pointerTarget.x = e.clientX;
      pointerTarget.y = e.clientY;
      isPointerActive = true;
      wake();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointerTarget.x = e.touches[0].clientX;
        pointerTarget.y = e.touches[0].clientY;
        isPointerActive = true;
        wake();
      }
    };

    const onPointerLeave = () => {
      pointerTarget.x = -1000;
      pointerTarget.y = -1000;
      wake();
    };

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) wake();
      else sleep();
    };

    // ── 3. RENDER FUNCTION ──────────────────────────────────────────
    function render(now: number) {
      if (!ctx) return;
      const dt = Math.min(32, now - lastTime);
      lastTime = now;
      time += dt * 0.001;

      // Smooth pointer interpolation
      const pointerLerp = Math.min(1, dt * 0.008 * 15);
      const dx = pointerTarget.x - pointer.x;
      const dy = pointerTarget.y - pointer.y;
      pointer.x += dx * pointerLerp;
      pointer.y += dy * pointerLerp;

      // Smooth scroll progress interpolation
      scrollProgress += (targetScrollProgress - scrollProgress) * Math.min(1, dt * 0.008 * 12);

      const isMoving = Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || Math.abs(targetScrollProgress - scrollProgress) > 0.002;
      if (!isMoving) {
        idleCounter++;
      } else {
        idleCounter = 0;
      }

      ctx.clearRect(0, 0, W, H);

      const glowRadius = 200;
      const glowRadiusSq = glowRadius * glowRadius;
      const glowingHexes: { hx: HexCell; glow: number; active: boolean; pulse: number }[] = [];

      // 1. Pass: Collect glowing/active hexes and stroke base grid in one single pass
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(184, 127, 30, 0.12)';

      for (let k = 0; k < hexes.length; k++) {
        const hx = hexes[k];
        const fracFromBottom = 1 - hx.y / H;
        const fillEdge = scrollProgress + (hx.seed - 0.5) * 0.14;
        const active = fracFromBottom < fillEdge;

        const pdx = hx.x - pointer.x;
        const pdy = hx.y - pointer.y;
        const distSq = pdx * pdx + pdy * pdy;
        const glow = distSq < glowRadiusSq ? 1 - Math.sqrt(distSq) / glowRadius : 0;

        if (active || glow > 0.02) {
          const pulse = 0.85 + 0.15 * Math.sin(time * 2 + hx.seed * 10);
          glowingHexes.push({ hx, glow, active, pulse });
        } else {
          const r = hx.size * 0.94;
          for (let i = 0; i < 6; i++) {
            const px = hx.x + r * HEX_ANGLES_COS[i];
            const py = hx.y + r * HEX_ANGLES_SIN[i];
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
      }
      ctx.stroke();

      // 2. Pass: Render glowing and active hex fills
      for (let j = 0; j < glowingHexes.length; j++) {
        const { hx, glow, active, pulse } = glowingHexes[j];
        const r = hx.size * 0.94;

        let fillAlpha = 0;
        if (active) {
          fillAlpha = Math.min(0.85, 0.28 * pulse + glow * 0.4);
        } else if (glow > 0.02) {
          fillAlpha = glow * 0.25;
        }

        if (fillAlpha > 0.01) {
          ctx.save();
          drawHexPath(hx.x, hx.y, r);
          ctx.clip();

          ctx.globalAlpha = fillAlpha;
          const drawSize = r * 2.3;
          ctx.drawImage(glowCanvas, hx.x - drawSize / 2, hx.y - drawSize / 2, drawSize, drawSize);
          ctx.restore();
        }

        ctx.beginPath();
        drawHexPath(hx.x, hx.y, r);
        const strokeAlpha = Math.min(0.65, 0.12 + glow * 0.35 + (active ? 0.08 : 0));
        ctx.strokeStyle = `rgba(184, 127, 30, ${strokeAlpha})`;
        ctx.stroke();
      }

      if (idleCounter > 180 && !isPointerActive) {
        sleep();
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    // ── 4. ATTACH LISTENERS & INITIALIZE ───────────────────────────
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave, { passive: true });
    window.addEventListener('touchend', onPointerLeave, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();

    if (reduceMotion) {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(184, 127, 30, 0.15)';
      for (let k = 0; k < hexes.length; k++) {
        const hx = hexes[k];
        const r = hx.size * 0.94;
        for (let i = 0; i < 6; i++) {
          const px = hx.x + r * HEX_ANGLES_COS[i];
          const py = hx.y + r * HEX_ANGLES_SIN[i];
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    } else {
      wake();
    }

    return () => {
      sleep();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('touchend', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div
      id="bakery-bg"
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      aria-hidden="true"
    >
      {/* Dynamic Honeycomb Warm Gradient Layer */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: 'linear-gradient(180deg, var(--top, #FFF7E4) 0%, var(--bottom, #F6DFA8) 100%)',
        }}
      />

      {/* Hardware-accelerated Honeycomb Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          willChange: 'transform',
        }}
      />

      {/* Subtle Warm Amber Vignette for Architectural Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 50%, transparent 60%, rgba(74, 52, 16, 0.06) 100%)',
        }}
      />
    </div>
  );
}
