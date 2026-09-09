"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1500,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  // The final figure is the default, not zero. That way the server render, a
  // crawler, a reader with JavaScript off, and any case where the animation
  // never starts all show the real number instead of a 0.
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);
  const settled = useRef(false);

  // Only drop to zero once we are on the client and can count back up.
  useEffect(() => {
    if (reduced || settled.current) return;
    setDisplay(0);
    setArmed(true);

    // Safety net: if the element never registers as in view, stop waiting and
    // show the number rather than leaving a zero on the page.
    const bail = window.setTimeout(() => {
      if (!settled.current) {
        settled.current = true;
        setDisplay(value);
      }
    }, 2500);
    return () => window.clearTimeout(bail);
  }, [reduced, value]);

  useEffect(() => {
    if (!armed || !inView || reduced || settled.current) return;
    settled.current = true;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out-expo, so the number lands softly instead of stopping dead
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(t === 1 ? value : value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, reduced, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
