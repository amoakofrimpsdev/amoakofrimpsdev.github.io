import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { education, projects, site, skillGroups } from "@/lib/content";

export default function Home() {
  const featured = projects.filter((p) => p.kind === "featured");
  const selected = projects.filter((p) => p.kind === "standard").slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />

      {/* ---------- Intro + numbers ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-lime/40" />
              Short version
            </div>
            <p className="mt-6 text-2xl leading-[1.35] text-paper sm:text-3xl">
              I taught robotics and programming in{" "}
              <span className="text-lime">50 high schools</span> across Ghana before I
              wrote my first line of production code. Explaining things to beginners
              turned out to be decent training for writing code other people have to
              read.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 self-end text-[15px] leading-relaxed text-paper-dim">
            <p>
              Right now I am finishing an MS in Computer Science at USC and interning at
              Easley-Dunn Productions, where I maintain a production C# game codebase,
              run the pull request pipeline, and write the unit tests that go with it.
            </p>
            <p>
              Before that I spent four years at Cadi Media as a part-time co-op
              developer, building client applications on React and Angular with Node and
              Express behind them. The one I am still attached to is a parent portal that
              let families check their children&apos;s grades online and put two schools&apos;
              paper report cards out of a job.
            </p>
            <Link
              href="/about/"
              className="group inline-flex items-center gap-2 font-display text-sm text-lime transition-opacity hover:opacity-75"
            >
              More about me
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-20">
          <Stats />
        </div>
      </section>

      {/* ---------- Featured work ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Selected projects"
          title="What I've built"
          lead="A spatial database, a physics engine, a pest classifier, and a controller checked against formal safety requirements."
          action={
            <Link
              href="/work/"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 font-display text-sm transition-colors hover:border-lime hover:text-lime"
            >
              All projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {selected.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section className="border-y border-line bg-ink-2/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            lead="Web development and STEM teaching, mostly running at the same time."
          />
          <Timeline />
        </div>
      </section>

      {/* ---------- Skills ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Toolbox"
          title="What I work with"
          lead="Weighted toward the frontend, but I write everything from the browser down to the database."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.07}>
              <div className="h-full rounded-xl border border-line bg-panel/40 p-6 transition-colors duration-300 hover:border-line-2">
                <h3 className="text-lg">{group.title}</h3>
                <p className="mt-1 font-mono text-[11px] tracking-wide text-lime">{group.note}</p>
                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-paper-dim">
                      <span className="h-1 w-1 rounded-full bg-lime/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-5 rounded-xl border border-dashed border-line-2 bg-ink-2/50 p-6">
            <h4 className="font-display text-sm tracking-wide text-lime">Currently learning</h4>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-paper-dim">
              FastAPI and the Model Context Protocol, both from graduate coursework.
              Coursework exposure, not production experience, and I would rather say so.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- Education ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeading eyebrow="Education" title="Where I studied" />
        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-line bg-panel/40 p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                  <span className="text-lime">{e.dates}</span>
                  <span className="text-muted">{e.place}</span>
                </div>
                <h3 className="mt-3 text-xl">{e.school}</h3>
                <p className="mt-1.5 text-paper-dim">{e.degree}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="relative overflow-hidden border-t border-line py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg mask-fade-y absolute inset-0 opacity-40" />
          <div className="absolute bottom-[-240px] left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(204,255,77,0.09),transparent_68%)] blur-3xl" />
        </div>

        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <div className="eyebrow">Contact</div>
          <h2 className="mt-5 text-[clamp(2.4rem,6.5vw,4.5rem)] leading-[1]">
            I&apos;m looking for a software engineering role.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-paper-dim">
            I graduate in May 2026. Based in Los Angeles, happy to work remote or
            relocate. Also open to STEM education work and anything that sits between
            the two.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-display text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              {site.email}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-7 py-3.5 font-display text-sm transition-colors hover:border-lime hover:text-lime"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
