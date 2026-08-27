import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Instagram, Play } from "@/components/Icons";
import { photography, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Photography: landscapes, community and church events, plus Lightroom editing walkthroughs.",
};

export default function PhotographyPage() {
  return (
    <>
      <PageHero
        eyebrow="Also"
        title={<>Photography.</>}
        lead={photography.intro}
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="flex flex-col gap-6 rounded-xl border border-line bg-panel/35 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-2 text-lime">
              <Instagram className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-lg">{photography.handle}</div>
              <p className="mt-0.5 max-w-md text-sm text-muted">{photography.note}</p>
            </div>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 font-display text-sm transition-colors hover:border-lime hover:text-lime"
          >
            Full profile
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {photography.posts.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.06} className="h-full">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/30 transition-colors duration-300 hover:border-line-2"
              >
                <div className="relative aspect-square overflow-hidden bg-ink-2">
                  {/* Instagram doesn't allow hot-linking images, so each tile is a
                      generated gradient plate rather than a broken <img>. */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at ${28 + i * 16}% ${30 + i * 12}%, rgba(240,168,62,0.30), transparent 58%), radial-gradient(circle at ${72 - i * 12}% ${74 - i * 10}%, rgba(79,193,181,0.28), transparent 60%), linear-gradient(150deg, #16203A, #0C1220)`,
                    }}
                  />
                  <div className="grid-bg absolute inset-0 opacity-25" />
                  <span className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border border-line-2 bg-ink/70 text-paper-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="p-5">
                  <div className="font-display text-[15px]">{p.title}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted">{p.date}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Tutorials"
            title="Editing walkthroughs"
            lead="Editing walkthroughs I made for the media team I lead."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {photography.tutorials.map((t, i) => (
              <Reveal key={t.href} delay={i * 0.08} className="h-full">
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-line bg-panel/35 p-7 transition-colors duration-300 hover:border-line-2"
                >
                  <div className="font-mono text-[10.5px] tracking-[0.18em] text-lime uppercase">
                    {t.tag}
                  </div>
                  <h3 className="mt-3 text-xl">{t.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{t.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-lime">
                    <Play /> Watch
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
