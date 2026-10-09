import Link from "next/link";
import { ViewTransition } from "react";
import CopyEmail from "@/components/CopyEmail";
import LocalTime from "@/components/LocalTime";
import SectionHead from "@/components/SectionHead";
import WorkCard from "@/components/WorkCard";
import { ArrowRight, ArrowUpRight, Github, Linkedin } from "@/components/icons";
import { caseStudies } from "@/content/case-studies";
import { facts, profile, receipts, roles } from "@/content/site";


export default function Home() {
  const [lead, ...others] = caseStudies;
  const featured = others.slice(0, 2);

  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
      <div>
{/* ------------------------------ Hero ------------------------------ */}
        <section className="wrap pt-14 pb-16 md:pt-24 md:pb-24">
          <p className="rise label flex items-center gap-2.5" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="live-dot" />
            Open to full-time software engineering roles
          </p>

          <h1
            className="rise display mt-7 max-w-[18ch] text-[clamp(2.7rem,7.6vw,6.75rem)]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Daniel Amoako Frimpong builds web software <em>end to end.</em>
          </h1>

          <div className="mt-9 grid gap-8 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
            <p className="rise text-lg leading-relaxed text-ink-2 md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
              {profile.intro}
            </p>
            <div className="rise flex flex-wrap items-center gap-3 md:justify-end" style={{ "--i": 3 } as React.CSSProperties}>
              <Link href="/work" className="btn btn-solid">
                See the work <ArrowRight />
              </Link>
              <Link href="/resume" className="btn btn-line">
                Résumé
              </Link>
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <dl
            className="rise mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-4"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {facts.map((f) => (
              <div key={f.label} className="bg-bg p-5 md:p-6">
                <dt className="label">{f.label}</dt>
                <dd className="mt-3 font-medium">{f.value}</dd>
                <dd className="mt-0.5 text-sm text-ink-2">{f.detail}</dd>
              </div>
            ))}
            <div className="bg-bg p-5 md:p-6">
              <dt className="label">Based</dt>
              <dd className="mt-3 font-medium">{profile.location}</dd>
              <dd className="mt-0.5 text-sm text-ink-2">
                <LocalTime timeZone={profile.timeZone} /> local time
              </dd>
            </div>
          </dl>
        </section>

{/* ---------------------------- Receipts ---------------------------- */}
        <section aria-label="Results in numbers" className="border-y border-line bg-surface">
          <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
            {receipts.map((r, i) => (
              <div
                key={r.label}
                className={`reveal py-9 md:py-12 ${i % 2 ? "pl-5 max-lg:border-l" : "pr-5"} ${
                  i < 2 ? "max-lg:border-b" : ""
                } lg:px-8 lg:first:pl-0 lg:last:pr-0 ${i ? "lg:border-l" : ""} border-line`}
              >
                <dt className="sr-only">{r.source}</dt>
                <dd className="display text-[clamp(2.5rem,5vw,4rem)] text-ink">{r.value}</dd>
                <dd className="mt-3 text-sm leading-relaxed text-ink-2">{r.label}</dd>
                <dd className="label mt-3">{r.source}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ------------------------------ Work ------------------------------ */}
        <section className="wrap py-24 md:py-32">
          <SectionHead
            label="Selected work"
            title={
              <>
                Projects with <em>something to try.</em>
              </>
            }
            lead="Every case study has a working demo of the core idea or the real data behind it. Here are three of the six."
          />
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <WorkCard study={lead} wide />
            {featured.map((s) => (
              <WorkCard key={s.slug} study={s} />
            ))}
          </div>
          <div className="reveal mt-10">
            <Link href="/work" className="btn btn-line">
              All six projects <ArrowRight />
            </Link>
          </div>
        </section>

        {/* --------------------------- Experience --------------------------- */}
        <section className="border-t border-line bg-surface">
          <div className="wrap py-24 md:py-32">
            <SectionHead
              label="Experience"
              title={
                <>
                  Where I have <em>worked.</em>
                </>
              }
              lead="Production code since 2020, most of it alongside a degree."
            />
            <ol className="border-b border-line">
              {roles.map((r) => (
                <li key={r.org} className="reveal grid gap-x-10 gap-y-1 border-t border-line py-6 md:grid-cols-[1fr_1fr_auto] md:items-baseline">
                  <h3 className="display text-2xl md:text-3xl">{r.title}</h3>
                  <div className="text-ink-2">
                    {r.org}
                    {r.kind && <span className="text-ink-3"> · {r.kind}</span>}
                  </div>
                  <div className={`font-mono text-xs ${r.current ? "text-accent-ink" : "text-ink-3"}`}>
                    {r.start} to {r.end}
                  </div>
                </li>
              ))}
            </ol>
            <div className="reveal mt-10 flex flex-wrap gap-3">
              <Link href="/experience" className="btn btn-line">
                Full experience <ArrowRight />
              </Link>
              <Link href="/about" className="btn btn-line">
                About me <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

{/* ----------------------------- Contact ---------------------------- */}
        <section id="contact" className="wrap py-28 md:py-40">
          <div className="label reveal">Contact</div>
          <h2 className="reveal display mt-5 max-w-[16ch] text-[clamp(2.8rem,8vw,7rem)]">
            Hiring an engineer? <em>Let&apos;s talk.</em>
          </h2>
          <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            I am looking for a full-time software engineering role. Based in Los Angeles, and open to remote
            work or relocating.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-solid">
              {profile.email} <ArrowUpRight />
            </a>
            <CopyEmail email={profile.email} />
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <Linkedin /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <Github /> GitHub
            </a>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
