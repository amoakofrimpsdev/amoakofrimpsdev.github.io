import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Demo from "@/components/demos/Demo";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

// Every case study is known at build time, so each page is prerendered.
export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { title: study.title, description: study.summary, url: `/work/${study.slug}`, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
      <article>
        <header className="wrap pt-10 pb-12 md:pt-14 md:pb-16">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink">
            <ArrowLeft /> All work
          </Link>

          <div className="label mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-accent-ink">{study.kicker}</span>
            <span aria-hidden>/</span>
            <span>{study.context}</span>
          </div>
          <h1 className="display mt-5 text-[clamp(2.8rem,8vw,6.5rem)]">{study.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink-2 md:text-2xl">{study.summary}</p>

          <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {study.metrics.map((m) => (
              <div key={m.label} className="bg-bg p-4 md:p-6">
                <dd className="display text-[clamp(1.5rem,4vw,3rem)]">{m.value}</dd>
                <dt className="mt-2 text-sm text-ink-2">{m.label}</dt>
              </div>
            ))}
          </dl>
        </header>

        {/* The demo takes the transition name the cover had on the home page. */}
        <section className="wrap" aria-label="Demo">
          <ViewTransition name={`cover-${study.slug}`} share="morph" default="none">
            <div>
              <Demo kind={study.demo} />
            </div>
          </ViewTransition>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-3">{study.demoNote}</p>
        </section>

        <div className="wrap grid gap-x-16 gap-y-12 py-20 md:grid-cols-[1fr_16rem] md:py-28">
          <div className="max-w-2xl space-y-14">
            {study.sections.map((s) => (
              <section key={s.heading} className="reveal">
                <h2 className="display text-4xl">{s.heading}</h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink-2">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            {study.figures && (
              <section className="reveal">
                <h2 className="display text-4xl">{study.demo === "jobhunt" ? "Screens" : "Figures"}</h2>
                <div className="mt-6 space-y-6">
                  {study.figures.map((f) => (
                    <figure key={f.src}>
                      <Image
                        src={f.src}
                        alt={f.caption}
                        width={f.width}
                        height={f.height}
                        sizes="(min-width: 768px) 42rem, 100vw"
                        className="h-auto w-full rounded-xl border border-line bg-white"
                      />
                      <figcaption className="mt-2.5 text-sm text-ink-3">{f.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="md:sticky md:top-24 md:self-start">
            <div className="label">Stack</div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {study.stack.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>

            {study.links.length > 0 && (
              <>
                <div className="label mt-8">Links</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {study.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
                        {l.label} <ArrowUpRight className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>
        </div>

        <nav aria-label="Next case study" className="border-t border-line bg-surface">
          <Link href={`/work/${next.slug}`} className="group wrap flex items-center justify-between gap-6 py-14 md:py-20">
            <div>
              <div className="label">Next</div>
              <div className="display mt-3 text-[clamp(2rem,5.5vw,4rem)] transition-colors group-hover:text-accent">
                {next.title}
              </div>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-2 transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowRight className="size-5" />
            </span>
          </Link>
        </nav>
      </article>
    </ViewTransition>
  );
}
