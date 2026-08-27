import { marquee } from "@/lib/content";

export default function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2/60 py-5">
      <div
        className="flex w-max animate-marquee gap-3"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-line-2 px-4 py-1.5 font-mono text-xs tracking-wide text-paper-dim"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
