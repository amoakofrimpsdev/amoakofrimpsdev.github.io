import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="noise relative overflow-hidden border-b border-line pt-40 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg mask-fade-y absolute inset-0 opacity-30" />
        <div className="absolute -top-32 right-0 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(79,193,181,0.15),transparent_66%)] blur-3xl" />
        <div className="absolute -top-20 left-0 h-[380px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(240,168,62,0.12),transparent_66%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-lime/40" />
            {eyebrow}
          </div>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,7vw,5rem)] leading-[1.02]">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
