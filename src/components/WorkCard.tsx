import Link from "next/link";
import { ViewTransition } from "react";
import type { CaseStudy } from "@/content/case-studies";
import Cover from "./Cover";
import { ArrowUpRight } from "./icons";

export default function WorkCard({ study, wide = false }: { study: CaseStudy; wide?: boolean }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className={`group reveal flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-line-2 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)] ${
        wide ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      {/* The cover shares a transition name with the case study hero, so it morphs across the navigation. */}
      <ViewTransition name={`cover-${study.slug}`} share="morph" default="none">
        <div className={`overflow-hidden border-b border-line bg-sunken ${wide ? "md:border-r md:border-b-0" : ""}`}>
          <Cover kind={study.demo} className="transition-transform duration-500 group-hover:scale-[1.025]" />
        </div>
      </ViewTransition>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="label flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-accent-ink">{study.kicker}</span>
          <span aria-hidden>/</span>
          <span>{study.context}</span>
        </div>

        <h3 className={`display mt-4 ${wide ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>{study.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-2">{study.summary}</p>

        <div className="mt-6 flex items-end justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">
            {study.stack.slice(0, 4).map((s) => (
              <li key={s} className="chip">{s}</li>
            ))}
          </ul>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-2 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
