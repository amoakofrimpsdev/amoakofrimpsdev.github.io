"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/content";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  // The spine fills in as you scroll through the list.
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(13rem+7px)]">
        <motion.div style={{ height }} className="w-full bg-gradient-to-b from-lime via-line-2 to-transparent" />
      </div>

      <ol className="space-y-14">
        {experience.map((job, i) => (
          <motion.li
            key={`${job.org}-${job.role}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-9 md:grid md:grid-cols-[13rem_1fr] md:gap-9 md:pl-0"
          >
            <div className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase md:pt-1.5 md:pr-7 md:text-right">
              <span className={job.current ? "text-lime" : undefined}>
                {job.start} to {job.end}
              </span>
            </div>

            <span
              aria-hidden
              className={`absolute top-1.5 left-0 h-[13px] w-[13px] rounded-full border-2 md:left-[13rem] ${
                job.current ? "border-lime bg-lime/25" : "border-line-2 bg-ink"
              }`}
            >
              {job.current && (
                <span className="absolute inset-0 animate-ping rounded-full border-2 border-lime" />
              )}
            </span>

            <div className="md:pl-1">
              <h3 className="text-xl">{job.role}</h3>
              <p className="mt-1.5 text-sm text-paper-dim">
                {job.org}
                <span className="text-muted">
                  {job.employment ? ` · ${job.employment}` : ""} · {job.place}
                </span>
              </p>
              <ul className="mt-4 space-y-2.5">
                {job.points.map((p) => (
                  <li key={p} className="relative pl-5 text-[15px] leading-relaxed text-muted">
                    <span className="absolute top-[0.66em] left-0 h-1 w-1 rounded-full bg-line-2" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line px-2 py-0.5 font-mono text-[10.5px] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
