"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import type { Project } from "@/lib/content";
import { ArrowUpRight, Play } from "./Icons";

export default function ProjectCard({ project }: { project: Project }) {
  // Pointer position drives both the tilt and the highlight that follows the cursor.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 220, damping: 22 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/40 p-7 transition-colors duration-300 hover:border-line-2"
    >
      {/* Neutral highlight tracking the cursor, with a thin lime edge on hover. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(250,250,249,0.06), transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="relative flex flex-1 flex-col">
        <div className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">
          {project.category}
        </div>

        <h3 className="mt-3 text-2xl">{project.title}</h3>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-paper-dim">{project.blurb}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-line bg-ink/60 px-2 py-1 font-mono text-[10.5px] text-muted"
            >
              {s}
            </span>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-paper-dim transition-colors hover:text-lime"
              >
                <Play />
                {l.label}
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
