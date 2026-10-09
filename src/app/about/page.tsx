import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
import { education, profile } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "How a robotics trainer in Ghana came to write software in Los Angeles.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
      <div>
{/* ------------------------------ About ----------------------------- */}
        <section>
          <div className="wrap grid gap-12 pt-14 pb-24 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-20 md:pt-20 md:pb-32">
            <div className="reveal">
              <Image
                src="/images/photos/portrait.jpg"
                alt="Daniel Amoako Frimpong, smiling and holding a camera"
                width={1280}
                height={853}
                sizes="(min-width: 768px) 24rem, 100vw"
                className="aspect-[4/5] w-full rounded-2xl border border-line object-cover object-[50%_30%]"
              />
              <p className="mt-3 text-sm text-ink-3">
                Also a photographer. I lead a church media team and post as{" "}
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
                  @bits.by.anda
                </a>
                .
              </p>
            </div>

            <div>
              <div className="label reveal">About</div>
              <h1 className="display mt-4 text-[clamp(2.2rem,4.8vw,3.75rem)]">
                I learned to explain things <em>before</em> I learned to ship them.
              </h1>
              <div className="reveal mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-2">
                <p>
                  I started out teaching. For four years I ran robotics training with Coderina, working with
                  students from 50 high schools across 5 regions of Ghana on VEX, LEGO EV3, and Arduino kits.
                </p>
                <p>
                  I was building web applications the whole time. Cadi Media took me on as a part-time co-op
                  developer in 2020 and I stayed four years, shipping React and Angular front ends with Node
                  and Express behind them. Then I moved to Los Angeles for a Master&apos;s in Computer Science
                  at USC, which I completed in May 2026.
                </p>
                <p>
                  Teaching shaped how I write code. If a room of beginners cannot follow an explanation, the
                  explanation is the problem. I hold my code to the same test: someone else has to be able to
                  read it.
                </p>
              </div>

              <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {education.map((e) => (
                  <li key={e.school} className="reveal bg-bg p-6">
                    <div className="font-mono text-xs text-ink-3">{e.dates}</div>
                    <div className="mt-2.5 font-medium">{e.school}</div>
                    <div className="text-ink-2">{e.degree}</div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-3">{e.coursework}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  );
}
