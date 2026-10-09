import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { caseStudies } from "@/content/case-studies";
import { education, profile, roles, siteUrl, toolkit } from "@/content/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.name}, ${profile.role} in ${profile.location}.`,
  alternates: { canonical: "/resume" },
};

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="label mb-4 border-b border-line pb-2 text-ink-2">{children}</h2>
);

export default function ResumePage() {
  const host = siteUrl.replace(/^https?:\/\//, "");

  return (
    <div className="wrap py-12 md:py-16">
      <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-sm text-ink-2">
          This page is laid out for paper. Print it, or save it as a PDF from the print dialog.
        </p>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-[52rem] rounded-2xl border border-line bg-surface p-7 md:p-12 print:max-w-none print:rounded-none print:border-0 print:p-0">
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-ink pb-6">
          <div>
            <h1 className="display text-5xl md:text-6xl">{profile.name}</h1>
            <p className="mt-2 text-lg text-ink-2">{profile.role}</p>
          </div>
          <ul className="text-sm leading-relaxed text-ink-2 md:text-right">
            <li>{profile.location}</li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.linkedin}>linkedin.com/in/danielfrimps</a></li>
            <li><a href={profile.github}>github.com/amoakofrimpsdev</a></li>
            {!host.startsWith("localhost") && <li><Link href="/">{host}</Link></li>}
          </ul>
        </header>

        <p className="mt-6 leading-relaxed text-ink-2">{profile.summary}</p>

        <section className="mt-9">
          <H>Experience</H>
          <div className="space-y-7">
            {roles.map((r) => (
              <div key={r.org} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <h3 className="font-semibold">
                    {r.title}, <span className="font-normal">{r.org}</span>
                  </h3>
                  <span className="font-mono text-xs text-ink-3">{r.start} to {r.end}</span>
                </div>
                <div className="text-sm text-ink-3">{[r.kind, r.place].filter(Boolean).join(" · ")}</div>
                <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-ink-2 marker:text-ink-3">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9">
          <H>Projects</H>
          <div className="space-y-4">
            {caseStudies.filter((c) => c.slug !== "parent-portal").map((c) => (
              <div key={c.slug} className="break-inside-avoid">
                <h3 className="font-semibold">
                  <Link href={`/work/${c.slug}`}>{c.title}</Link>
                  <span className="ml-2 font-mono text-xs font-normal text-ink-3">{c.stack.slice(0, 3).join(", ")}</span>
                </h3>
                <p className="text-[0.95rem] leading-relaxed text-ink-2">{c.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9 break-inside-avoid">
          <H>Education</H>
          <div className="space-y-3">
            {education.map((e) => (
              <div key={e.school} className="flex flex-wrap items-baseline justify-between gap-x-6">
                <div>
                  <span className="font-semibold">{e.school}</span>
                  <span className="text-ink-2">, {e.degree}</span>
                </div>
                <span className="font-mono text-xs text-ink-3">{e.dates}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9 break-inside-avoid">
          <H>Skills</H>
          <dl className="space-y-1.5 text-[0.95rem]">
            {toolkit.map((g) => (
              <div key={g.title} className="grid grid-cols-[6.5rem_1fr] gap-3">
                <dt className="font-semibold">{g.title}</dt>
                <dd className="text-ink-2">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </article>
    </div>
  );
}
