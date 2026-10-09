import type { Metadata } from "next";
import { ViewTransition } from "react";
import SectionHead from "@/components/SectionHead";
import WorkCard from "@/components/WorkCard";
import { ArrowUpRight } from "@/components/icons";
import { caseStudies } from "@/content/case-studies";
import { moreProjects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Six case studies, each with a working demo or the real data, plus smaller projects and a research paper.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const [lead, ...rest] = caseStudies;

  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
      <div>
{/* ------------------------------ Work ------------------------------ */}
        <section className="wrap pt-14 pb-24 md:pt-20 md:pb-32">
          <SectionHead
            as="h1"
            label="Selected work"
            title={
              <>
                Six projects, each with <em>something to try.</em>
              </>
            }
            lead="Every case study has a working demo of the core idea or the real data behind it, plus a short account of the problem and what I did about it."
          />

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            <WorkCard study={lead} wide />
            {rest.map((s, i) => (
              // With an odd number left over, the last card goes full width so the grid has no gap.
              <WorkCard key={s.slug} study={s} wide={rest.length % 2 === 1 && i === rest.length - 1} />
            ))}
          </div>

          <div className="mt-20">
            <h3 className="label reveal">More projects and writing</h3>
            <ul className="mt-5 border-t border-line">
              {moreProjects.map((p) => (
                <li
                  key={p.title}
                  className="reveal grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-[18rem_1fr_auto] md:items-baseline"
                >
                  <h4 className="font-medium">{p.title}</h4>
                  <p className="text-ink-2">{p.blurb}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link inline-flex items-center gap-1"
                      >
                        {l.label} <ArrowUpRight className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
