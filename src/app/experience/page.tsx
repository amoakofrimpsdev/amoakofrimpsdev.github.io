import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
import SectionHead from "@/components/SectionHead";
import { community, roles, teaching, toolkit } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Engineering roles, teaching and community work, and the tools Daniel Amoako Frimpong works with.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
      <div>
{/* --------------------------- Experience --------------------------- */}
        <section>
          <div className="wrap pt-14 pb-24 md:pt-20 md:pb-28">
            <SectionHead
              as="h1"
              label="Experience"
              title={
                <>
                  Where I have <em>worked.</em>
                </>
              }
              lead="Production code since 2020, most of it alongside a degree. I taught robotics through the same years."
            />

            <ol>
              {roles.map((r) => (
                <li
                  key={r.org}
                  className="reveal grid gap-x-12 gap-y-4 border-t border-line py-10 md:grid-cols-[15rem_1fr]"
                >
                  <div>
                    <div className={`font-mono text-xs tracking-wide ${r.current ? "text-accent-ink" : "text-ink-3"}`}>
                      {r.start} to {r.end}
                    </div>
                    <div className="mt-2 font-medium">{r.org}</div>
                    <div className="text-sm text-ink-2">
                      {[r.kind, r.place].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div>
                    <h3 className="display text-3xl">{r.title}</h3>
                    <ul className="mt-5 max-w-3xl space-y-3">
                      {r.points.map((p) => (
                        <li key={p} className="relative pl-5 leading-relaxed text-ink-2">
                          <span className="absolute top-[0.72em] left-0 h-px w-2.5 bg-line-2" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {r.stack.map((s) => (
                        <li key={s} className="chip">{s}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 border-t border-line pt-10">
              <h3 className="label reveal">Teaching and community</h3>
              <ul className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
                {teaching.map((t) => (
                  <li key={t.org} className="reveal">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-medium">{t.title}</span>
                      <span className="shrink-0 font-mono text-xs text-ink-3">{t.dates}</span>
                    </div>
                    <div className="text-sm text-ink-2">{t.org}</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.note}</p>
                  </li>
                ))}
              </ul>

              <ul className="mt-12 grid gap-4 sm:grid-cols-3">
                {community.map((c) => (
                  <li key={c.src} className="reveal">
                    <figure>
                      <Image
                        src={c.src}
                        alt={c.alt}
                        width={c.width}
                        height={c.height}
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="aspect-[4/3] w-full rounded-xl border border-line object-cover"
                      />
                      <figcaption className="mt-2.5 text-sm text-ink-3">{c.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

{/* ----------------------------- Toolkit ---------------------------- */}
        <section className="border-t border-line bg-surface">
          <div className="wrap py-24 md:py-28">
          <SectionHead
            label="Toolkit"
            title={
              <>
                What I <em>work with.</em>
              </>
            }
            lead="Weighted toward the front end, but I write everything from the browser down to the database."
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {toolkit.map((g) => (
              <div key={g.title} className="reveal bg-surface p-6 md:p-7">
                <h3 className="font-medium">{g.title}</h3>
                <p className="label mt-1.5">{g.note}</p>
                <ul className="mt-6 space-y-2.5 text-ink-2">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        </section>
      </div>
    </ViewTransition>
  );
}
