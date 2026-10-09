const steps = [
  { n: "01", title: "Sign in", body: "The parent submits their credentials from the React app over SSL." },
  { n: "02", title: "Token issued", body: "The Express API checks them and returns a signed JSON Web Token." },
  { n: "03", title: "Request grades", body: "Each later request carries the token in its Authorization header." },
  { n: "04", title: "Verify, then read", body: "The API verifies the token first, then returns only that parent's children." },
];

const mono = { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em" } as const;

/** Request flow for the parent portal. Server rendered; the motion is CSS and SMIL only. */
export default function PortalFlow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <svg viewBox="0 0 1000 300" className="block w-full" role="img" aria-label="A parent's browser talks to an Express API over SSL. The API verifies a JSON Web Token before reading grade records.">
        <defs>
          <path id="flow-out" d="M270 128H400" />
          <path id="flow-db" d="M620 128H750" />
        </defs>

        {[
          { x: 60, title: "BROWSER", l1: "React front end", l2: "Parent signs in" },
          { x: 410, title: "API", l1: "Node + Express", l2: "Verifies JWT" },
          { x: 760, title: "DATA", l1: "Grade records", l2: "Scoped to parent" },
        ].map((b) => (
          <g key={b.title}>
            <rect x={b.x} y="70" width="200" height="130" rx="14" fill="var(--bg)" stroke="var(--line-2)" />
            <text x={b.x + 20} y="104" style={mono} fill="var(--ink-3)">{b.title}</text>
            <text x={b.x + 20} y="140" fontSize="19" fontWeight="500" fill="var(--ink)">{b.l1}</text>
            <text x={b.x + 20} y="168" fontSize="15" fill="var(--ink-2)">{b.l2}</text>
          </g>
        ))}

        {/* Request and response between browser and API */}
        <path d="M270 128H400" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M400 152H270" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="5 5" />
        <path d="M620 128H750" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M750 152H620" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="5 5" />
        <text x="335" y="114" textAnchor="middle" style={mono} fill="var(--accent-ink)">SSL</text>
        <text x="335" y="178" textAnchor="middle" style={{ ...mono, fontSize: 11 }} fill="var(--ink-3)">JWT</text>
        <text x="685" y="114" textAnchor="middle" style={mono} fill="var(--ink-3)">QUERY</text>

        {/* Lock on the API */}
        <g transform="translate(578 84)" fill="none" stroke="var(--accent)" strokeWidth="1.6">
          <rect x="0" y="8" width="16" height="12" rx="2.5" />
          <path d="M3.5 8V5.5a4.5 4.5 0 0 1 9 0V8" />
        </g>

        {/* Travelling request */}
        <g className="motion-reduce:hidden">
          <circle r="6" fill="var(--accent)">
            <animateMotion dur="2.4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.45;1" calcMode="linear">
              <mpath href="#flow-out" />
            </animateMotion>
          </circle>
          <circle r="6" fill="var(--accent)" opacity="0">
            <animate attributeName="opacity" dur="2.4s" repeatCount="indefinite" values="0;0;1;1;0" keyTimes="0;0.5;0.52;0.95;1" />
            <animateMotion dur="2.4s" repeatCount="indefinite" keyPoints="0;0;1" keyTimes="0;0.52;1" calcMode="linear">
              <mpath href="#flow-db" />
            </animateMotion>
          </circle>
        </g>

        <text x="60" y="252" style={mono} fill="var(--ink-3)">EVERY REQUEST IS AUTHENTICATED BEFORE ANY GRADE IS READ</text>
      </svg>

      <ol className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="bg-surface px-5 py-4">
            <div className="font-mono text-[11px] text-accent-ink">{s.n}</div>
            <div className="mt-1.5 text-sm font-medium">{s.title}</div>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
