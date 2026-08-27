"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Types each role out, holds, deletes, moves to the next. */
export default function RoleCycler({ roles }: { roles: string[] }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const full = roles[index % roles.length];

    if (!deleting && text === full) {
      const hold = setTimeout(() => setDeleting(true), 1900);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      const next = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }, 0);
      return () => clearTimeout(next);
    }

    const step = setTimeout(
      () =>
        setText((prev) =>
          deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1),
        ),
      deleting ? 32 : 62,
    );
    return () => clearTimeout(step);
  }, [text, deleting, index, roles, reduced]);

  // With reduced motion the first role is simply stated, no typing, no caret.
  if (reduced) {
    return <span className="font-mono text-lime">{roles[0]}</span>;
  }

  return (
    <span className="font-mono text-lime" aria-live="polite">
      {text}
      <span
        className="animate-caret ml-0.5 inline-block w-[2px] translate-y-[2px] bg-lime align-middle"
        style={{ height: "1.05em" }}
      />
    </span>
  );
}
