import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <div className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-lime/40" />
          {eyebrow}
        </div>
        <h2 className="mt-4 text-4xl sm:text-5xl">{title}</h2>
        {lead && <p className="mt-4 text-lg text-muted">{lead}</p>}
      </div>
      {action}
    </Reveal>
  );
}
