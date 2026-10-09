"use client";

import { useEffect, useRef, useState } from "react";
import { aabbInFrustum, aabbOverlap, frustumPlanes, type AABB } from "@/lib/geometry";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";

const W = 1000;
const H = 560;
const COUNT = 72;
const FOV = (58 * Math.PI) / 180;
const FAR = 440;
const EYE = { x: W / 2, y: H - 24 };

type Body = AABB & { vx: number; vy: number; hit: number };

// Small seeded generator so the scene is the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeBodies(): Body[] {
  const rand = mulberry32(7);
  return Array.from({ length: COUNT }, () => {
    const size = 16 + rand() * 26;
    return {
      x: rand() * (W - size),
      y: rand() * (H - 90 - size),
      w: size,
      h: size * (0.7 + rand() * 0.6),
      vx: (rand() - 0.5) * 70,
      vy: (rand() - 0.5) * 70,
      hit: 0,
    };
  });
}

export default function PrimeDemo() {
  const reduced = usePrefersReducedMotion();
  const [wrapRef, inView] = useInView<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnRef = useRef<HTMLSpanElement>(null);
  const culledRef = useRef<HTMLSpanElement>(null);
  const hitsRef = useRef<HTMLSpanElement>(null);
  const aim = useRef<number | null>(null);
  // The loop reads the ref so toggling does not restart the scene; the state drives the label.
  const cullingRef = useRef(true);
  const [culling, setCulling] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !inView) return;

    const bodies = makeBodies();
    let raf = 0;
    let last = performance.now();
    let frameNo = 0;
    let colors = { ink: "#000", line: "#999", accent: "#e8431a", wash: "#e8431a22", muted: "#777" };

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      colors = {
        ink: cs.getPropertyValue("--ink").trim(),
        line: cs.getPropertyValue("--line-2").trim(),
        accent: cs.getPropertyValue("--accent").trim(),
        wash: cs.getPropertyValue("--accent-wash").trim(),
        muted: cs.getPropertyValue("--ink-3").trim(),
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientWidth * (H / W) * dpr);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const frame = (now: number) => {
      const dt = reduced ? 0 : Math.min((now - last) / 1000, 0.05);
      last = now;
      if (frameNo++ % 30 === 0) readColors();

      // Integrate, and bounce off the walls of the scene.
      for (const b of bodies) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0 || b.x + b.w > W) { b.vx *= -1; b.x = Math.max(0, Math.min(W - b.w, b.x)); }
        if (b.y < 0 || b.y + b.h > H - 70) { b.vy *= -1; b.y = Math.max(0, Math.min(H - 70 - b.h, b.y)); }
        b.hit = Math.max(0, b.hit - dt * 2.5);
      }

      // Collision: test every pair, then push overlapping boxes apart along
      // the axis where they overlap least and swap that velocity component.
      let hits = 0;
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i];
          const b = bodies[j];
          if (!aabbOverlap(a, b)) continue;
          hits++;
          a.hit = b.hit = 1;
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox < oy) {
            const dir = a.x < b.x ? -1 : 1;
            a.x += (dir * ox) / 2; b.x -= (dir * ox) / 2;
            [a.vx, b.vx] = [b.vx, a.vx];
          } else {
            const dir = a.y < b.y ? -1 : 1;
            a.y += (dir * oy) / 2; b.y -= (dir * oy) / 2;
            [a.vy, b.vy] = [b.vy, a.vy];
          }
        }
      }

      // Camera direction: follow the pointer if there is one, otherwise sweep.
      const sweep = -Math.PI / 2 + Math.sin(now / 2600) * 0.85;
      const dir = aim.current ?? (reduced ? -Math.PI / 2 : sweep);
      const planes = frustumPlanes(EYE, dir, FOV, FAR);

      const k = canvas.width / W;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Frustum wedge: the eye plus the two corners of the far plane.
      const fx = EYE.x + Math.cos(dir) * FAR;
      const fy = EYE.y + Math.sin(dir) * FAR;
      const half = FAR * Math.tan(FOV / 2);
      const px = -Math.sin(dir) * half;
      const py = Math.cos(dir) * half;
      ctx.beginPath();
      ctx.moveTo(EYE.x, EYE.y);
      ctx.lineTo(fx - px, fy - py);
      ctx.lineTo(fx + px, fy + py);
      ctx.closePath();
      ctx.fillStyle = colors.wash;
      ctx.fill();
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      let drawn = 0;
      for (const b of bodies) {
        const visible = !cullingRef.current || aabbInFrustum(b, planes);
        if (visible) {
          drawn++;
          ctx.fillStyle = b.hit > 0 ? colors.accent : colors.ink;
          ctx.globalAlpha = 1;
          ctx.fillRect(b.x, b.y, b.w, b.h);
        } else {
          ctx.globalAlpha = 0.9;
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = colors.line;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.setLineDash([]);
        }
      }
      ctx.globalAlpha = 1;

      // Camera marker
      ctx.beginPath();
      ctx.arc(EYE.x, EYE.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.fill();

      if (drawnRef.current) drawnRef.current.textContent = `${drawn} / ${COUNT}`;
      if (culledRef.current) culledRef.current.textContent = `${Math.round((1 - drawn / COUNT) * 100)}%`;
      if (hitsRef.current) hitsRef.current.textContent = String(hits);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView, reduced]);

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const y = ((e.clientY - r.top) / r.height) * H;
    // Keep the camera pointing into the scene, not back at the floor.
    aim.current = Math.max(-Math.PI + 0.3, Math.min(-0.3, Math.atan2(y - EYE.y, x - EYE.x)));
  };

  return (
    <div ref={wrapRef} className="overflow-hidden rounded-2xl border border-line bg-surface">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Boxes drifting and colliding. A camera wedge sweeps the scene, and only boxes inside the wedge are drawn solid."
        onPointerMove={onPointer}
        onPointerLeave={() => (aim.current = null)}
        className="block aspect-[1000/560] w-full touch-none"
      />
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line bg-bg/60 px-4 py-3">
        <dl className="flex gap-6 font-mono text-[13px]">
          <div><dt className="label">Drawn</dt><dd><span ref={drawnRef} className="tabular-nums">0 / {COUNT}</span></dd></div>
          <div><dt className="label">Culled</dt><dd><span ref={culledRef} className="tabular-nums">0%</span></dd></div>
          <div><dt className="label">Overlaps</dt><dd><span ref={hitsRef} className="tabular-nums">0</span></dd></div>
        </dl>
        <button
          type="button"
          aria-pressed={culling}
          onClick={() => {
            cullingRef.current = !culling;
            setCulling(!culling);
          }}
          className="btn btn-line py-2 text-xs"
        >
          <span className={`size-2 rounded-full ${culling ? "bg-accent" : "bg-line-2"}`} />
          Frustum culling {culling ? "on" : "off"}
        </button>
      </div>
    </div>
  );
}
