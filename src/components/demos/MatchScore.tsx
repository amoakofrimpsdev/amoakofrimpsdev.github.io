"use client";

import { useState } from "react";
import { ROLE, UNKNOWN, WEIGHT, scoreJob, type RoleFit } from "@/lib/match";

// A made-up posting, so the demo has something to score.
const posting = {
  title: "Frontend Engineer",
  company: "Example Co.",
  yearsMin: 2,
  skills: ["TypeScript", "React", "Next.js", "CSS", "Testing", "GraphQL", "Node.js", "AWS"],
};

const roleOptions: { id: RoleFit; label: string }[] = [
  { id: "exact", label: "Exact title" },
  { id: "same", label: "Same kind of work" },
  { id: "related", label: "Related" },
  { id: "different", label: "Different" },
];

const bandLabel = { strong: "Strong match", good: "Good match", fair: "Fair match", low: "Low match" };
const R = 52;
const CIRC = 2 * Math.PI * R;

export default function MatchScore() {
  const [roleFit, setRoleFit] = useState<RoleFit>("same");
  const [have, setHave] = useState(() => new Set(["TypeScript", "React", "Next.js", "CSS", "Node.js"]));
  const [years, setYears] = useState(1);
  const [needsSponsorship, setNeeds] = useState(false);
  const [noSponsorship, setNo] = useState(false);

  const result = scoreJob({
    roleFit,
    asked: posting.skills,
    have,
    yearsMin: posting.yearsMin,
    years,
    needsSponsorship,
    noSponsorship,
  });

  const toggle = (skill: string) =>
    setHave((prev) => {
      const next = new Set(prev);
      if (!next.delete(skill)) next.add(skill);
      return next;
    });

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[1fr_22rem]">
      {/* Inputs */}
      <div className="space-y-7 p-5 md:p-7">
        <div>
          <div className="label">The posting</div>
          <div className="mt-2 text-lg font-medium">
            {posting.title} <span className="font-normal text-ink-2">at {posting.company}</span>
          </div>
          <div className="text-sm text-ink-2">Asks for {posting.yearsMin}+ years. Names eight skills.</div>
        </div>

        <fieldset>
          <legend className="label">How close is the role to your target title?</legend>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {roleOptions.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={roleFit === o.id}
                onClick={() => setRoleFit(o.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  roleFit === o.id ? "border-ink bg-ink text-bg" : "border-line text-ink-2 hover:border-ink hover:text-ink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="label">Skills you have. The first five count double.</legend>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {posting.skills.map((s, i) => {
              const on = have.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s)}
                  className={`rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors ${
                    on ? "border-accent bg-accent-wash text-ink" : "border-line text-ink-3 hover:border-line-2"
                  }`}
                >
                  {s}
                  {i < 5 && <span className="ml-1.5 text-accent-ink">×2</span>}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="block">
          <span className="label">Your years of experience</span>
          <span className="mt-3 flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full max-w-64 accent-accent"
            />
            <span className="font-mono text-sm tabular-nums">{years}</span>
          </span>
        </label>

        <fieldset className="space-y-2.5 text-sm text-ink-2">
          <legend className="label mb-3">Work authorization</legend>
          <label className="flex items-center gap-2.5">
            <input type="checkbox" checked={needsSponsorship} onChange={(e) => setNeeds(e.target.checked)} className="size-4 accent-accent" />
            I need visa sponsorship
          </label>
          <label className="flex items-center gap-2.5">
            <input type="checkbox" checked={noSponsorship} onChange={(e) => setNo(e.target.checked)} className="size-4 accent-accent" />
            The posting says it will not sponsor
          </label>
        </fieldset>
      </div>

      {/* Result */}
      <div className="border-t border-line bg-bg/60 p-5 md:p-7 lg:border-t-0 lg:border-l" aria-live="polite">
        <div className="flex items-center gap-5">
          <svg viewBox="0 0 120 120" className="size-28 shrink-0 -rotate-90" aria-hidden>
            <circle cx="60" cy="60" r={R} fill="none" stroke="var(--line)" strokeWidth="9" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - result.score / 100)}
              className="transition-[stroke-dashoffset] duration-500 ease-out"
            />
          </svg>
          <div>
            <div className="display text-6xl tabular-nums">{result.score}</div>
            <div className="label mt-1 text-accent-ink">{bandLabel[result.band]}</div>
          </div>
        </div>

        <ul className="mt-7 space-y-5">
          {result.parts.map((p) => {
            const value = p.score ?? UNKNOWN;
            return (
              <li key={p.key}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">
                    {p.label} <span className="font-normal text-ink-3">· {Math.round(WEIGHT[p.key] * 100)}%</span>
                  </span>
                  <span className="font-mono tabular-nums">{p.score ?? `${UNKNOWN}*`}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-ink transition-[width] duration-500 ease-out" style={{ width: `${value}%` }} />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{p.key === "role" ? ROLE[roleFit].reason : p.reason}</p>
              </li>
            );
          })}
        </ul>

        {result.cap && (
          <p className="mt-6 rounded-lg border border-accent/40 bg-accent-wash px-3.5 py-3 text-sm leading-relaxed text-ink">
            {result.cap}
          </p>
        )}
      </div>
    </div>
  );
}
