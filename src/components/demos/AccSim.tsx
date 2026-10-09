"use client";

import { useEffect, useRef, useState } from "react";
import {
  BRAKE_ZONE,
  CAUTION_ZONE,
  MIN_SAFE,
  initialState,
  step,
  type Scenario,
  type SimState,
  type Zone,
} from "@/lib/acc";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { Pause, Play } from "../icons";

const W = 1000;
const EGO_FRONT = 170; // x of the ego car's front bumper
const SCALE = 8; // px per metre
const CAR = 62;
const HISTORY = 160;

const scenarios: { id: Scenario; label: string }[] = [
  { id: "steady", label: "Steady lead" },
  { id: "hardBrake", label: "Lead brakes hard" },
  { id: "stopGo", label: "Stop and go" },
];

const zoneLabel: Record<Zone, string> = {
  failsafe: "Failsafe braking",
  brake: "Proportional braking",
  limit: "Limited acceleration",
  cruise: "Cruise control",
};

const bands: { zone: Zone; from: number; to: number; tint: number }[] = [
  { zone: "failsafe", from: 0, to: MIN_SAFE, tint: 0.5 },
  { zone: "brake", from: MIN_SAFE, to: BRAKE_ZONE, tint: 0.26 },
  { zone: "limit", from: BRAKE_ZONE, to: CAUTION_ZONE, tint: 0.11 },
];

type Sample = { v: number; vLead: number };

export default function AccSim() {
  const reduced = usePrefersReducedMotion();
  const [wrapRef, inView] = useInView<HTMLDivElement>();
  const [scenario, setScenario] = useState<Scenario>("hardBrake");
  const [vSet, setVSet] = useState(26);
  const [override, setOverride] = useState<boolean | null>(null);
  const running = override ?? !reduced;

  const sim = useRef<SimState>(initialState("hardBrake"));
  const history = useRef<Sample[]>([]);
  const [view, setView] = useState<{ s: SimState; trace: Sample[] }>(() => ({
    s: initialState("hardBrake"),
    trace: [],
  }));

  useEffect(() => {
    if (!running || !inView) return;
    let raf = 0;
    let last = performance.now();
    let tick = 0;

    const frame = (now: number) => {
      // Clamp the step so a background tab does not produce one giant jump.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      sim.current = step(sim.current, dt, scenario, vSet);

      if (tick++ % 6 === 0) {
        history.current.push({ v: sim.current.v, vLead: sim.current.vLead });
        if (history.current.length > HISTORY) history.current.shift();
      }
      setView({ s: sim.current, trace: [...history.current] });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [running, inView, scenario, vSet]);

  const choose = (id: Scenario) => {
    sim.current = initialState(id);
    history.current = [];
    setScenario(id);
    setView({ s: sim.current, trace: [] });
  };

  const { s, trace } = view;
  const leadRear = EGO_FRONT + s.gap * SCALE;
  const leadVisible = leadRear < W - 10;
  const following = s.zone !== "cruise";

  const maxV = 34;
  const tx = (i: number) => (i / (HISTORY - 1)) * W;
  const ty = (v: number) => 78 - (v / maxV) * 70;
  const line = (key: keyof Sample) => trace.map((p, i) => `${i ? "L" : "M"}${tx(i).toFixed(1)} ${ty(p[key]).toFixed(1)}`).join("");

  return (
    <div ref={wrapRef} className="overflow-hidden rounded-2xl border border-line bg-surface">
      {/* Road */}
      <svg viewBox={`0 0 ${W} 250`} className="block w-full" role="img" aria-label={`Simulation: gap ${s.gap.toFixed(0)} metres, ${zoneLabel[s.zone]}`}>
        {bands.map((b) => (
          <rect
            key={b.zone}
            x={EGO_FRONT + b.from * SCALE}
            y="70"
            width={(b.to - b.from) * SCALE}
            height="110"
            fill="var(--accent)"
            opacity={s.zone === b.zone ? b.tint + 0.2 : b.tint}
          />
        ))}
        <path d={`M0 70H${W}M0 180H${W}`} stroke="var(--ink)" strokeWidth="2" />
        <path
          d={`M0 125H${W}`}
          stroke="var(--line-2)"
          strokeWidth="2"
          strokeDasharray="26 22"
          strokeDashoffset={(s.travelled * SCALE) % 48}
        />
        {[
          { m: MIN_SAFE, t: `${MIN_SAFE} m` },
          { m: BRAKE_ZONE, t: `${BRAKE_ZONE} m` },
          { m: CAUTION_ZONE, t: `${CAUTION_ZONE} m` },
        ].map((k) => (
          <g key={k.m}>
            <path d={`M${EGO_FRONT + k.m * SCALE} 58V192`} stroke="var(--ink-3)" strokeDasharray="3 5" />
            <text x={EGO_FRONT + k.m * SCALE + 6} y="50" fontSize="13" fontFamily="var(--font-mono)" fill="var(--ink-3)">
              {k.t}
            </text>
          </g>
        ))}

        {/* Ego vehicle */}
        <rect x={EGO_FRONT - CAR} y="136" width={CAR} height="34" rx="8" fill="var(--ink)" />
        <rect x={EGO_FRONT - 20} y="141" width="11" height="24" rx="3" fill="var(--bg)" opacity="0.35" />
        {s.accel < -0.4 && <rect x={EGO_FRONT - CAR - 3} y="140" width="4" height="26" rx="2" fill="var(--accent)" />}

        {/* Lead vehicle */}
        {leadVisible ? (
          <rect x={leadRear} y="136" width={CAR} height="34" rx="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
        ) : (
          <text x={W - 16} y="158" textAnchor="end" fontSize="14" fontFamily="var(--font-mono)" fill="var(--ink-3)">
            lead {s.gap.toFixed(0)} m ahead →
          </text>
        )}

        {/* Gap bracket */}
        {leadVisible && s.gap > 3 && (
          <g stroke="var(--accent)" strokeWidth="2">
            <path d={`M${EGO_FRONT} 214H${leadRear}M${EGO_FRONT} 206v16M${leadRear} 206v16`} />
          </g>
        )}
        <text
          x={leadVisible ? Math.max((EGO_FRONT + leadRear) / 2, EGO_FRONT + 34) : EGO_FRONT + 40}
          y="240"
          textAnchor="middle"
          fontSize="14"
          fontFamily="var(--font-mono)"
          fill="var(--accent-ink)"
        >
          {s.gap.toFixed(1)} m
        </text>
      </svg>

      {/* Telemetry */}
      <dl className="grid grid-cols-2 gap-px border-t border-line bg-line text-sm sm:grid-cols-4">
        {[
          { k: "Mode", v: following ? "Following" : "Cruising" },
          { k: "Zone", v: zoneLabel[s.zone], hot: s.zone === "failsafe" },
          { k: "Speed, ego / lead", v: `${s.v.toFixed(1)} / ${s.vLead.toFixed(1)} m/s` },
          { k: "Command", v: `${s.accel >= 0 ? "+" : ""}${s.accel.toFixed(2)} m/s²` },
        ].map((r) => (
          <div key={r.k} className="bg-surface px-4 py-3">
            <dt className="label">{r.k}</dt>
            <dd className={`mt-1 font-mono text-[13px] tabular-nums ${r.hot ? "text-accent-ink" : "text-ink"}`}>{r.v}</dd>
          </div>
        ))}
      </dl>

      {/* Speed trace */}
      <div className="border-t border-line px-4 pt-3 pb-1">
        <div className="label flex items-center gap-4">
          <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 bg-ink" /> Ego</span>
          <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 border-t-2 border-dashed border-ink-3" /> Lead</span>
          <span className="flex items-center gap-1.5"><i className="h-0.5 w-4 bg-accent" /> Set speed</span>
        </div>
        <svg viewBox={`0 0 ${W} 84`} preserveAspectRatio="none" className="mt-2 block h-16 w-full" aria-hidden>
          <path d={`M0 ${ty(vSet)}H${W}`} stroke="var(--accent)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={line("vLead")} fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
          <path d={line("v")} fill="none" stroke="var(--ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line bg-bg/60 px-4 py-3">
        <button
          type="button"
          onClick={() => setOverride(!running)}
          aria-label={running ? "Pause simulation" : "Play simulation"}
          className="grid size-9 place-items-center rounded-full bg-ink text-bg transition-colors hover:bg-accent hover:text-white"
        >
          {running ? <Pause /> : <Play />}
        </button>

        <div role="group" aria-label="Scenario" className="flex rounded-full border border-line p-0.5">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              type="button"
              aria-pressed={scenario === sc.id}
              onClick={() => choose(sc.id)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                scenario === sc.id ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-xs text-ink-2">
          Set speed
          <input
            type="range"
            min={14}
            max={32}
            step={1}
            value={vSet}
            onChange={(e) => setVSet(Number(e.target.value))}
            className="w-28 accent-accent"
          />
          <span className="w-12 font-mono tabular-nums text-ink">{vSet} m/s</span>
        </label>
      </div>
    </div>
  );
}
