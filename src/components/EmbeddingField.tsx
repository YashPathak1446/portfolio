'use client';

import { useEffect, useRef } from 'react';

type Pt = { x: number; y: number; vx: number; vy: number; r: number };

const COUNT = 110;
const K = 6;

export default function EmbeddingField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = ref.current;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    const c2d = cv.getContext('2d');
    if (!c2d) return;
    const ctx: CanvasRenderingContext2D = c2d;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const pts: Pt[] = [];
    const query = { x: -999, y: -999, active: false };

    const css = getComputedStyle(document.documentElement);
    let ink = css.getPropertyValue('--muted').trim() || '#6b7684';
    let signal = css.getPropertyValue('--signal').trim() || '#1d6e5a';

    function readTheme() {
      const s = getComputedStyle(document.documentElement);
      ink = s.getPropertyValue('--muted').trim() || ink;
      signal = s.getPropertyValue('--signal').trim() || signal;
    }

    function resize() {
      const rect = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      pts.length = 0;
      // three loose clusters, like a real embedding space rather than uniform noise
      const centers = [
        { x: 0.3, y: 0.34 },
        { x: 0.68, y: 0.3 },
        { x: 0.5, y: 0.72 },
      ];
      for (let i = 0; i < COUNT; i++) {
        const c = centers[i % centers.length];
        const spread = 0.19;
        const a = Math.random() * Math.PI * 2;
        const d = Math.pow(Math.random(), 0.65) * spread;
        pts.push({
          x: (c.x + Math.cos(a) * d) * w,
          y: (c.y + Math.sin(a) * d) * h,
          vx: (Math.random() - 0.5) * 0.09,
          vy: (Math.random() - 0.5) * 0.09,
          r: 1.1 + Math.random() * 1.5,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      let near: { p: Pt; d: number }[] = [];
      if (query.active) {
        near = pts
          .map((p) => ({ p, d: Math.hypot(p.x - query.x, p.y - query.y) }))
          .sort((a, b) => a.d - b.d)
          .slice(0, K);
      }
      const nearSet = new Set(near.map((n) => n.p));
      const maxD = near.length ? near[near.length - 1].d : 1;

      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        const hit = nearSet.has(p);
        ctx.beginPath();
        ctx.arc(p.x, p.y, hit ? p.r * 1.9 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = hit ? signal : ink;
        ctx.globalAlpha = hit ? 0.95 : 0.34;
        ctx.fill();
      }

      for (const n of near) {
        const t = 1 - n.d / (maxD || 1);
        ctx.beginPath();
        ctx.moveTo(query.x, query.y);
        ctx.lineTo(n.p.x, n.p.y);
        ctx.strokeStyle = signal;
        ctx.globalAlpha = 0.18 + t * 0.5;
        ctx.lineWidth = 0.6 + t * 1.1;
        ctx.stroke();
      }

      if (query.active) {
        ctx.beginPath();
        ctx.arc(query.x, query.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = signal;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(query.x, query.y, 13, 0, Math.PI * 2);
        ctx.strokeStyle = signal;
        ctx.globalAlpha = 0.32;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }

    function loop() {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const rect = cv.getBoundingClientRect();
      query.x = e.clientX - rect.left;
      query.y = e.clientY - rect.top;
      query.active = query.x >= 0 && query.x <= w && query.y >= 0 && query.y <= h;
    }
    function onLeave() {
      query.active = false;
    }

    const ro = new ResizeObserver(() => {
      resize();
      seed();
      if (reduced) draw();
    });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const mo = new MutationObserver(readTheme);

    resize();
    seed();
    ro.observe(cv);
    io.observe(cv);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerleave', onLeave);

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="field" aria-hidden="true">
      <canvas ref={ref} />
      <span className="field-caption">move to query · nearest neighbours highlight</span>
    </div>
  );
}