const weeks = [
  { w: "Week 1", t: "Read chapters 1 and 2", tag: "Reading" },
  { w: "Week 2", t: "Problem set 1 due Friday", tag: "Deadline" },
  { w: "Week 3", t: "Review session, then quiz", tag: "Quiz" },
];

/** The CoursePilot flow, shown as three panels. Illustrative content, not real user data. */
export default function CoursePilotFlow() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="grid gap-px bg-line md:grid-cols-3">
        <section className="bg-surface p-5">
          <div className="label">01 · Upload a syllabus</div>
          <div className="mt-4 rounded-xl border border-line bg-bg p-4">
            <div className="font-mono text-[11px] text-ink-3">syllabus.pdf</div>
            <div className="mt-3 space-y-2">
              {[88, 64, 76, 92, 48, 80].map((w, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full ${i === 3 || i === 5 ? "bg-accent/80" : "bg-line-2"}`}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-3">Dates, readings, and deadlines are picked out of the text.</p>
          </div>
        </section>

        <section className="bg-surface p-5">
          <div className="label">02 · Get a study plan</div>
          <ul className="mt-4 space-y-2">
            {weeks.map((x) => (
              <li key={x.w} className="rounded-xl border border-line bg-bg px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-ink-3">{x.w}</span>
                  <span className="chip">{x.tag}</span>
                </div>
                <div className="mt-1.5 text-sm">{x.t}</div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-3">The plan is written to your calendar through an API.</p>
        </section>

        <section className="bg-surface p-5">
          <div className="label">03 · Study from it</div>
          <div className="relative mt-4">
            <div className="absolute inset-x-3 -bottom-2 h-full rounded-xl border border-line bg-sunken" aria-hidden />
            <div className="relative rounded-xl border border-line-2 bg-bg p-4">
              <div className="font-mono text-[11px] text-ink-3">Flashcard</div>
              <p className="mt-3 font-serif text-xl leading-snug">
                What does the week 3 quiz cover?
              </p>
              <div className="mt-5 flex gap-2">
                <span className="chip">Show answer</span>
                <span className="chip">Next</span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs text-ink-3">Flashcards and quizzes are generated from the same material.</p>
        </section>
      </div>
    </div>
  );
}
