"use client";

import { useState } from "react";
import { SUNDAY, dayPostAt, messagesUntil, type Message, type Scenario } from "@/lib/service-day";

const services: { id: string; label: string; day: [string, string]; scenario: Scenario }[] = [
  { id: "sun", label: "Sunday, 10:00 AM", day: ["Sun", "Mon"], scenario: SUNDAY },
  { id: "early", label: "Early service, 8:00 AM", day: ["Sun", "Mon"], scenario: { ...SUNDAY, service: "Early Service", startHour: 8 } },
  { id: "wed", label: "Wednesday, 7:00 PM", day: ["Wed", "Thu"], scenario: { ...SUNDAY, service: "Midweek Prayer", startHour: 19 } },
];

function clock(h: number, day: [string, string]) {
  const d = Math.floor(h / 24);
  const mins = Math.round((h - d * 24) * 60);
  const hh = Math.floor(mins / 60) % 24;
  const mm = mins % 60;
  const suffix = hh < 12 ? "AM" : "PM";
  return `${day[Math.min(d, 1)]} ${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${suffix}`;
}

function since(h: number) {
  const sign = h < 0 ? "before" : "after";
  const a = Math.abs(h);
  const hrs = Math.floor(a);
  const min = Math.round((a - hrs) * 60);
  return `${hrs ? `${hrs}h ` : ""}${min ? `${min}m ` : ""}${hrs || min ? sign : "at"} start`;
}

function Bubble({ m, day }: { m: Message; day: [string, string] }) {
  const time = <span className="font-mono text-[10.5px] text-ink-3">{clock(m.at, day)}</span>;
  const body = (() => {
    switch (m.kind) {
      case "today":
        return (
          <>
            <b>📸 Today: {m.service}</b>
            <br />
            Upload here when you are done. Covering: {m.covering.map((p) => `@${p}`).join(", ")}
          </>
        );
      case "uploads":
        return (
          <>
            <b>📤 Uploads for {m.service}</b>
            {m.lines.map((l) => (
              <span key={l} className="block">✅ {l}</span>
            ))}
          </>
        );
      case "reminder":
        return (
          <>
            <b>⏰ Still to upload</b>
            <br />
            {m.tagged.map((p) => `@${p}`).join(" ")}, nothing from you yet.
          </>
        );
      case "ready":
        return <b>✅ {m.category} is ready for {m.team}</b>;
      case "late":
        return (
          <>
            <b>Late:</b> {m.category} for {m.team} passed its deadline.
          </>
        );
    }
  })();
  return (
    <li className={`max-w-[34rem] rounded-2xl rounded-tl-md border px-3.5 py-2.5 text-sm leading-relaxed ${m.kind === "late" ? "border-accent/50 bg-accent-wash" : "border-line bg-surface"}`}>
      <div className="mb-1 flex items-center justify-between gap-4">
        <span className="text-xs font-medium text-accent-ink">RCW Media bot</span>
        {time}
      </div>
      {body}
    </li>
  );
}

export default function ServiceDay() {
  const [id, setId] = useState("sun");
  const svc = services.find((s) => s.id === id)!;
  const s = svc.scenario;
  const min = dayPostAt(s.startHour) - 1;
  const max = s.startHour + 27;
  const [offset, setOffset] = useState(3.25); // hours after start
  const now = Math.min(max, Math.max(min, s.startHour + offset));
  const messages = messagesUntil(s, now);
  const uploaded = new Set(s.uploads.filter((u) => s.startHour + u.at <= now).map((u) => u.person));

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div role="group" aria-label="Service" className="flex flex-wrap rounded-full border border-line p-0.5">
          {services.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={id === o.id}
              onClick={() => setId(o.id)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${id === o.id ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
        <div className="text-right">
          <div className="font-mono text-sm tabular-nums">{clock(now, svc.day)}</div>
          <div className="label">{since(now - s.startHour)}</div>
        </div>
      </div>

      <div className="border-b border-line px-5 py-4">
        <label className="label block" htmlFor="service-clock">Drag through the day</label>
        <input
          id="service-clock"
          type="range"
          min={min - s.startHour}
          max={max - s.startHour}
          step={0.25}
          value={now - s.startHour}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="mt-3 w-full accent-accent"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {s.assigned.map((a) => (
            <span key={a.person} className={`chip ${uploaded.has(a.person) ? "border-accent/50 text-ink" : ""}`}>
              {uploaded.has(a.person) ? "✓" : "·"} {a.person}, {a.category}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[22rem] bg-bg/60 px-5 py-5">
        <div className="label mb-3">Media team group, Telegram</div>
        {messages.length === 0 ? (
          <p className="text-sm text-ink-3">Nothing yet. The bot posts first at {clock(dayPostAt(s.startHour), svc.day)}.</p>
        ) : (
          <ol className="space-y-2.5" aria-live="polite">
            {messages.map((m, i) => (
              <Bubble key={`${m.kind}-${m.at}-${i}`} m={m} day={svc.day} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
