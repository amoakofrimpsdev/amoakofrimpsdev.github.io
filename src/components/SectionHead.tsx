import type { ReactNode } from "react";

export default function SectionHead({
  label,
  title,
  lead,
  as: Heading = "h2",
}: {
  label: string;
  title: ReactNode;
  lead?: string;
  /** Use h1 when this heads a page, h2 when it heads a section. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="reveal mb-12 grid gap-5 md:mb-16 md:grid-cols-[1fr_minmax(0,26rem)] md:items-end md:gap-12">
      <div>
        <div className="label">{label}</div>
        <Heading className="display mt-4 text-[clamp(2.4rem,5.6vw,4.5rem)]">{title}</Heading>
      </div>
      {lead && <p className="text-lg leading-relaxed text-ink-2 md:pb-2">{lead}</p>}
    </div>
  );
}
