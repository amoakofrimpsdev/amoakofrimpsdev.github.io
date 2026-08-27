"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft light that trails the pointer. Visibility is handled in CSS
 * (`.cursor-glow` only paints for fine pointers with motion allowed) so the
 * component renders identically on the server and the client.
 */
export default function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="cursor-glow pointer-events-none fixed z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[90px]"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,var(--color-lime),transparent_62%)]" />
    </motion.div>
  );
}
