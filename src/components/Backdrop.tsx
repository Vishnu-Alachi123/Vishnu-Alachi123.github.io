import { useEffect, useRef } from 'react';

const REDUCE =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type Dot = { x: number; y: number; vx: number; vy: number };

/**
 * Ambient, cursor-reactive constellation rendered on a fixed full-viewport
 * canvas behind all content. Deliberately subtle. Static/blank under
 * prefers-reduced-motion.
 */
export default function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      // density scales with area, capped for performance
      const count = Math.min(90, Math.round((w * h) / 22000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(82,199,255,0.16)';
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        // gentle pull toward the cursor
        const mdx = mouse.x - d.x;
        const mdy = mouse.y - d.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 26000) {
          d.x += mdx * 0.0009;
          d.y += mdy * 0.0009;
        }

        // links to nearby dots
        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const dx = d.x - o.x;
          const dy = d.y - o.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 15000) {
            const a = (1 - dist2 / 15000) * 0.18;
            ctx.strokeStyle = `rgba(82,199,255,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }

        const near = md2 < 26000;
        ctx.fillStyle = near ? 'rgba(120,215,255,0.6)' : 'rgba(82,199,255,0.28)';
        ctx.beginPath();
        ctx.arc(d.x, d.y, near ? 1.8 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    if (REDUCE) {
      drawStatic();
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(frame);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else raf = requestAnimationFrame(frame);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
