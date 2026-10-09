import type { DemoKind } from "@/content/case-studies";

/**
 * Cover art for each case study, drawn as SVG from theme tokens so it
 * follows light and dark mode and costs no image requests.
 */
const mono = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em" } as const;

function Portal() {
  const rows = [
    { w: 150, grade: "A" },
    { w: 118, grade: "B+" },
    { w: 168, grade: "A-" },
    { w: 96, grade: "B" },
  ];
  return (
    <>
      <rect x="90" y="56" width="460" height="288" rx="14" fill="var(--surface)" stroke="var(--line-2)" />
      <path d="M90 96h460" stroke="var(--line)" />
      {[112, 130, 148].map((x) => (
        <circle key={x} cx={x} cy="76" r="4.5" fill="var(--line-2)" />
      ))}
      <rect x="200" y="65" width="240" height="22" rx="11" fill="var(--sunken)" />
      <path d="M216 79v-4a3.5 3.5 0 0 1 7 0v4m-9 0h11v6h-11z" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <rect x="234" y="73" width="120" height="6" rx="3" fill="var(--line-2)" />
      <circle cx="136" cy="140" r="18" fill="var(--sunken)" stroke="var(--line)" />
      <rect x="166" y="130" width="120" height="8" rx="4" fill="var(--ink)" />
      <rect x="166" y="146" width="72" height="6" rx="3" fill="var(--line-2)" />
      {rows.map((r, i) => (
        <g key={i} transform={`translate(118 ${186 + i * 36})`}>
          <path d="M0 26h404" stroke="var(--line)" />
          <rect y="6" width={r.w} height="7" rx="3.5" fill="var(--line-2)" />
          <rect
            x="356"
            y="-1"
            width="48"
            height="20"
            rx="10"
            fill={i === 0 ? "var(--accent)" : "var(--sunken)"}
          />
          <text x="380" y="13" textAnchor="middle" style={mono} fill={i === 0 ? "#fff" : "var(--ink-2)"}>
            {r.grade}
          </text>
        </g>
      ))}
    </>
  );
}

function Acc() {
  return (
    <>
      <text x="64" y="112" style={mono} fill="var(--ink-3)">GAP TO LEAD VEHICLE</text>
      <rect x="150" y="150" width="70" height="100" fill="var(--accent)" opacity="0.5" />
      <rect x="220" y="150" width="130" height="100" fill="var(--accent)" opacity="0.24" />
      <rect x="350" y="150" width="150" height="100" fill="var(--accent)" opacity="0.1" />
      <path d="M40 150h560M40 250h560" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M40 200h560" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="18 16" />
      {[
        { x: 150, t: "FAILSAFE" },
        { x: 220, t: "BRAKE" },
        { x: 350, t: "LIMIT" },
        { x: 500, t: "CRUISE" },
      ].map((z) => (
        <g key={z.t}>
          <path d={`M${z.x} 138v124`} stroke="var(--ink-3)" strokeDasharray="3 4" />
          <text x={z.x + 6} y="282" style={mono} fill="var(--ink-2)">{z.t}</text>
        </g>
      ))}
      <rect x="76" y="180" width="74" height="40" rx="9" fill="var(--ink)" />
      <rect x="126" y="186" width="14" height="28" rx="4" fill="var(--bg)" opacity="0.35" />
      <rect x="418" y="180" width="74" height="40" rx="9" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M150 314h268" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M150 308v12M418 308v12" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="284" y="338" textAnchor="middle" style={mono} fill="var(--accent-ink)">29.8 m</text>
    </>
  );
}

function Jute() {
  const bars = [
    { m: "ResNet50", v: 0.41 },
    { m: "ResNet101", v: 0.347 },
    { m: "VGG16", v: 0.882 },
    { m: "EffNetB0", v: 0.007 },
    { m: "DenseNet201", v: 0.947 },
  ];
  const h = 210;
  return (
    <>
      <text x="64" y="72" style={mono} fill="var(--ink-3)">MACRO F1 BY BACKBONE</text>
      {[0, 0.5, 1].map((t) => (
        <path key={t} d={`M64 ${310 - t * h}h512`} stroke="var(--line)" strokeDasharray={t ? "3 5" : undefined} />
      ))}
      {bars.map((b, i) => {
        const best = i === bars.length - 1;
        const bh = Math.max(b.v * h, 3);
        const x = 86 + i * 100;
        return (
          <g key={b.m}>
            <rect x={x} y={310 - bh} width="62" height={bh} rx="4" fill={best ? "var(--accent)" : "var(--line-2)"} />
            <text x={x + 31} y={310 - bh - 10} textAnchor="middle" style={mono} fill={best ? "var(--accent-ink)" : "var(--ink-2)"}>
              {b.v.toFixed(3)}
            </text>
            <text x={x + 31} y="334" textAnchor="middle" style={{ ...mono, fontSize: 9.5, letterSpacing: "0.04em" }} fill="var(--ink-3)">
              {b.m}
            </text>
          </g>
        );
      })}
    </>
  );
}

function Prime() {
  // [x, y, size, insideFrustum]
  const boxes: [number, number, number, boolean][] = [
    [96, 84, 34, false], [182, 132, 26, false], [250, 70, 30, true], [318, 118, 40, true],
    [392, 76, 28, true], [470, 110, 32, false], [540, 72, 26, false], [286, 196, 30, true],
    [352, 214, 24, true], [120, 214, 30, false], [512, 222, 36, false], [208, 262, 24, false],
    [432, 268, 26, false], [70, 300, 28, false], [560, 318, 24, false],
  ];
  return (
    <>
      <path d="M320 352 196 40h248z" fill="var(--accent-wash)" stroke="var(--accent)" strokeWidth="1.5" />
      {boxes.map(([x, y, s, inside], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={s}
          height={s}
          rx="3"
          fill={inside ? "var(--ink)" : "none"}
          stroke={inside ? "var(--ink)" : "var(--line-2)"}
          strokeWidth="1.5"
          strokeDasharray={inside ? undefined : "4 4"}
        />
      ))}
      <circle cx="320" cy="352" r="7" fill="var(--accent)" />
      <text x="338" y="364" style={mono} fill="var(--ink-2)">CAMERA</text>
      <text x="64" y="372" style={mono} fill="var(--ink-3)">DRAWN 5 / 15</text>
    </>
  );
}

function CoursePilot() {
  return (
    <>
      <rect x="70" y="70" width="170" height="250" rx="10" fill="var(--surface)" stroke="var(--line-2)" />
      <text x="88" y="100" style={mono} fill="var(--ink-3)">SYLLABUS.PDF</text>
      {[120, 138, 156, 190, 208, 242, 260, 278].map((y, i) => (
        <rect
          key={y}
          x="88"
          y={y}
          width={[130, 96, 118, 134, 72, 124, 104, 60][i]}
          height="7"
          rx="3.5"
          fill={i === 3 || i === 5 ? "var(--accent)" : "var(--line-2)"}
          opacity={i === 3 || i === 5 ? 0.85 : 1}
        />
      ))}
      <path d="M262 195h62m-10-9 10 9-10 9" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="348" y="70" width="222" height="118" rx="10" fill="var(--surface)" stroke="var(--line-2)" />
      <text x="366" y="98" style={mono} fill="var(--ink-3)">STUDY PLAN</text>
      {Array.from({ length: 14 }, (_, i) => (
        <rect
          key={i}
          x={366 + (i % 7) * 27}
          y={112 + Math.floor(i / 7) * 30}
          width="21"
          height="22"
          rx="4"
          fill={[2, 5, 9, 11].includes(i) ? "var(--accent)" : "var(--sunken)"}
          opacity={[2, 5, 9, 11].includes(i) ? 0.85 : 1}
        />
      ))}
      <rect x="360" y="216" width="198" height="104" rx="10" fill="var(--sunken)" stroke="var(--line)" transform="rotate(3 459 268)" />
      <rect x="348" y="208" width="222" height="112" rx="10" fill="var(--surface)" stroke="var(--line-2)" />
      <text x="366" y="236" style={mono} fill="var(--ink-3)">FLASHCARD 3 / 24</text>
      <rect x="366" y="256" width="160" height="8" rx="4" fill="var(--ink)" />
      <rect x="366" y="274" width="112" height="8" rx="4" fill="var(--ink)" />
      <rect x="366" y="296" width="68" height="6" rx="3" fill="var(--line-2)" />
    </>
  );
}

function Jobhunt() {
  const rows = [
    { score: 91, w: 230, chips: [84, 58, 96], top: true },
    { score: 78, w: 190, chips: [70, 88], top: false },
    { score: 64, w: 250, chips: [62, 74, 54], top: false },
  ];
  const r = 21;
  const c = 2 * Math.PI * r;
  return (
    <>
      <text x="64" y="62" style={mono} fill="var(--ink-3)">RANKED FOR YOU · NO MODEL INVOLVED</text>
      {rows.map((row, i) => (
        <g key={row.score} transform={`translate(64 ${84 + i * 96})`}>
          <rect width="512" height="80" rx="14" fill="var(--surface)" stroke={row.top ? "var(--ink)" : "var(--line-2)"} strokeWidth={row.top ? 1.5 : 1} />
          <g transform="translate(46 40)">
            <circle r={r} fill="none" stroke="var(--line)" strokeWidth="5" />
            <circle
              r={r}
              fill="none"
              stroke={row.top ? "var(--accent)" : "var(--ink-3)"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - row.score / 100)}
              transform="rotate(-90)"
            />
            <text y="5" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-mono)">
              {row.score}
            </text>
          </g>
          <rect x="90" y="20" width={row.w} height="9" rx="4.5" fill="var(--ink)" />
          {row.chips.map((w, j) => (
            <rect
              key={j}
              x={90 + row.chips.slice(0, j).reduce((a, b) => a + b + 8, 0)}
              y="44"
              width={w}
              height="18"
              rx="9"
              fill={row.top && j === 0 ? "var(--accent)" : "var(--sunken)"}
              opacity={row.top && j === 0 ? 0.9 : 1}
            />
          ))}
          <rect x="436" y="27" width="56" height="26" rx="13" fill="none" stroke="var(--line-2)" />
        </g>
      ))}
    </>
  );
}

const art: Record<DemoKind, () => React.ReactElement> = {
  jobhunt: Jobhunt,
  portal: Portal,
  acc: Acc,
  jute: Jute,
  prime: Prime,
  coursepilot: CoursePilot,
};

export default function Cover({ kind, className = "" }: { kind: DemoKind; className?: string }) {
  const Art = art[kind];
  return (
    <svg viewBox="0 0 640 400" aria-hidden className={`block h-auto w-full ${className}`}>
      <Art />
    </svg>
  );
}
