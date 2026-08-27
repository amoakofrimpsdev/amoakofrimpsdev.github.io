"use client";

import { stats } from "@/lib/content";
import CountUp from "./CountUp";
import { RevealGroup, revealChild } from "./Reveal";
import { motion } from "framer-motion";

export default function Stats() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
      {stats.map((s) => (
        <motion.div key={s.label} variants={revealChild} className="bg-ink-2 px-6 py-9">
          <div className="font-display text-4xl font-semibold text-paper sm:text-5xl">
            <CountUp value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
          </div>
          <div className="mt-2 text-sm text-muted">{s.label}</div>
        </motion.div>
      ))}
    </RevealGroup>
  );
}
