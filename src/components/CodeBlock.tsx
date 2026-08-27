/** A small terminal-styled panel for showing a code excerpt. */
export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink">
      <div className="flex items-center gap-2 border-b border-line bg-ink-2/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        {label && (
          <span className="ml-2 font-mono text-[11px] tracking-wide text-muted">{label}</span>
        )}
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed text-paper-dim">
        <code>{code}</code>
      </pre>
    </div>
  );
}
