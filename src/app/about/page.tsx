import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { community, education, site, skillGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Daniel Amoako Frimpong: how a robotics trainer in Ghana ended up writing production software in Los Angeles.",
};

const facts = [
  { label: "Currently", value: "MS Computer Science, USC. Graduating May 2026." },
  { label: "Based in", value: "Los Angeles, California" },
  { label: "Undergrad", value: "BSc Information Technology, GCTU. First Class Honours." },
  { label: "From", value: "Accra, Ghana" },
  { label: "Societies", value: "NSBE USC, ACM USC" },
  { label: "Outside work", value: "Church media lead, photography" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A bit about how I got here.</>}
        lead="Robotics classrooms in Ghana, then a Master's at USC, then production code. Roughly in that order, with a lot of overlap."
      />

      {/* ---------- Story ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <Reveal className="space-y-5 text-[16px] leading-relaxed text-paper-dim">
            <p>
              I am finishing a Master&apos;s in Computer Science at USC. Before that I
              studied Information Technology at Ghana Communication Technology
              University in Accra and graduated with First Class Honours.
            </p>
            <p>
              I did not start in software. I started teaching it. For four years I ran
              robotics training for Coderina, working with students from 50 high schools
              across 5 regions of Ghana on VEX, LEGO EV3, and Arduino kits. Teams I
              coached finished top 5 at the national competition three years in a row,
              and I trained 20 instructors to run the same curriculum.
            </p>
            <p>
              I was building web applications the whole time. Cadi Media took me on as a
              part-time co-op developer in 2020 and I stayed four years, shipping React
              and Angular frontends with Node and Express behind them. That is where I
              learned what breaks when real people use your software, and how to talk to
              a client who does not care which framework you picked.
            </p>
            <p>
              Most of my work now is frontend. React, Next.js, TypeScript, and the
              unglamorous parts: forms, loading states, keyboard access, the things that
              decide whether an interface is actually usable. I also write the APIs
              underneath, the database queries under those, and occasionally a C++
              physics engine when a course asks for one.
            </p>
            <p>
              Outside of work I lead a church media team, shoot photography, and I am a
              member of the National Society of Black Engineers.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(79,193,181,0.2),transparent_62%)] blur-2xl"
              />
              <Image
                src="/images/photos/portrait.jpg"
                alt={site.name}
                width={1280}
                height={853}
                className="w-full rounded-xl border border-line object-cover"
              />
            </div>

            <dl className="mt-8 divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel/30">
              {facts.map((f) => (
                <div key={f.label} className="px-5 py-4">
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-lime uppercase">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-paper">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section className="border-y border-line bg-ink-2/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Experience"
            title="Every role, in order"
            lead="Web development and STEM teaching, mostly running at the same time."
          />
          <Timeline />
        </div>
      </section>

      {/* ---------- Skills ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills"
          lead="Weighted toward the frontend, but I write everything from the browser down to the database."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.07}>
              <div className="h-full rounded-xl border border-line bg-panel/35 p-6 transition-colors duration-300 hover:border-line-2">
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
      </section>

      {/* ---------- Education ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeading eyebrow="Education" title="Where I studied" />
        <div className="grid gap-6 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.08}>
              <div className="h-full rounded-xl border border-line bg-panel/35 p-7">
                <div className="font-mono text-[11px] tracking-[0.16em] text-lime uppercase">
                  {e.dates}
                </div>
                <h3 className="mt-3 text-xl">{e.school}</h3>
                <p className="mt-1.5 text-lime">{e.degree}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Teaching & community ---------- */}
      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Outside the codebase"
            title="Teaching and community"
            lead="Workshops, competitions, and a borehole, across Ghana."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {community.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel/35 transition-colors duration-300 hover:border-line-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg leading-snug">{c.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{c.blurb}</p>
                    {c.link && (
                      <a
                        href={c.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-lime transition-opacity hover:opacity-70"
                      >
                        {c.link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
