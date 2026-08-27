import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import CodeBlock from "@/components/CodeBlock";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { juteFigures, juteResults, projects, publication } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work: adaptive cruise control in CARLA, a 17-class computer vision benchmark, full stack applications, and a C++ physics engine.",
};

export default function WorkPage() {
  const featured = projects.filter((p) => p.kind === "featured");
  const rest = projects.filter((p) => p.kind === "standard");
  const carla = featured.find((p) => p.slug === "carla-acc")!;
  const jute = featured.find((p) => p.slug === "jute-pest")!;
  const best = Math.max(...juteResults.map((r) => r.f1));

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={<>Projects, in detail.</>}
        lead="Longer write-ups on the two I put the most into, then everything else."
      />

      {/* ---------- CARLA deep dive ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <Reveal>
            <div className="font-mono text-[10.5px] tracking-[0.18em] text-lime uppercase">
              {carla.category}
            </div>
            <h2 className="mt-3 text-4xl">{carla.title}</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              {carla.body?.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {carla.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-ink-2/70 px-2.5 py-1 font-mono text-[11px] text-paper-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:pt-16">
            <CodeBlock code={carla.code!} label="controller.py" />
          </Reveal>
        </div>
      </section>

      {/* ---------- Jute deep dive ---------- */}
      <section className="border-y border-line bg-ink-2/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <div className="font-mono text-[10.5px] tracking-[0.18em] text-lime uppercase">
              {jute.category}
            </div>
            <h2 className="mt-3 text-4xl">{jute.title}</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              {jute.body?.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {jute.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-paper-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          {/* results table */}
          <Reveal delay={0.1} className="mt-14">
            <div className="overflow-x-auto rounded-xl border border-line bg-ink/60">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <caption className="border-b border-line px-6 py-4 text-left font-mono text-[11px] tracking-wide text-muted">
                  Macro-averaged metrics across all five backbones, test set
                </caption>
                <thead>
                  <tr className="border-b border-line text-left font-mono text-[11px] tracking-wider text-muted uppercase">
                    <th className="px-6 py-3 font-normal">Model</th>
                    <th className="px-6 py-3 font-normal">Precision</th>
                    <th className="px-6 py-3 font-normal">Recall</th>
                    <th className="px-6 py-3 font-normal">F1</th>
                    <th className="px-6 py-3 font-normal">AUC</th>
                  </tr>
                </thead>
                <tbody>
                  {juteResults.map((r) => {
                    const isBest = r.f1 === best;
                    return (
                      <tr
                        key={r.model}
                        className={`border-b border-line/60 last:border-0 ${
                          isBest ? "bg-lime/[0.05]" : ""
                        }`}
                      >
                        <td className={`px-6 py-3.5 ${isBest ? "text-lime" : "text-paper"}`}>
                          {r.model}
                          {isBest && (
                            <span className="ml-2 rounded border border-lime/40 px-1.5 py-0.5 font-mono text-[9.5px] tracking-wider text-lime uppercase">
                              Best
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 font-mono tabular-nums text-paper-dim">{r.precision}</td>
                        <td className="px-6 py-3.5 font-mono tabular-nums text-paper-dim">{r.recall}</td>
                        <td className="px-6 py-3.5 font-mono tabular-nums text-paper-dim">
                          <span className="flex items-center gap-2.5">
                            <span className="h-1.5 w-16 overflow-hidden rounded-full bg-line">
                              <span
                                className={`block h-full rounded-full ${isBest ? "bg-lime" : "bg-line-2"}`}
                                style={{ width: `${r.f1 * 100}%` }}
                              />
                            </span>
                            {r.f1}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 font-mono tabular-nums text-paper-dim">{r.auc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* figures */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {juteFigures.map((f, i) => (
              <Reveal key={f.src} delay={i * 0.06}>
                <figure className="overflow-hidden rounded-xl border border-line bg-ink/60">
                  <Image
                    src={f.src}
                    alt={f.caption}
                    width={1200}
                    height={800}
                    className="h-auto w-full bg-white/95"
                  />
                  <figcaption className="border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
                    {f.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Everything else ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="More projects"
          title="Everything else"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Research ---------- */}
      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Research"
            title="Published"
            lead="One paper, from the farm monitoring work."
          />
          <Reveal>
            <article className="group relative overflow-hidden rounded-xl border border-line bg-panel/35 p-8 transition-colors duration-300 hover:border-line-2 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(240,168,62,0.13),transparent_66%)] blur-2xl"
              />
              <div className="relative">
                <div className="font-mono text-[10.5px] tracking-[0.18em] text-lime uppercase">
                  {publication.venue}
                </div>
                <h3 className="mt-3 max-w-2xl text-2xl sm:text-3xl">{publication.title}</h3>
                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
                  {publication.abstract}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  {publication.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-lime transition-opacity hover:opacity-70"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
