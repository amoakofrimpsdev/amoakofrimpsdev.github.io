"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { caseStudies } from "@/content/case-studies";
import { profile } from "@/content/site";
import { toggleTheme } from "@/lib/theme";
import { Search } from "./icons";

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

export const OPEN_PALETTE = "palette:open";

export default function CommandPalette() {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const out = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");
    return [
      { id: "home", group: "Go to", label: "Home", run: go("/") },
      { id: "work", group: "Go to", label: "Selected work", run: go("/work") },
      { id: "exp", group: "Go to", label: "Experience", run: go("/experience") },
      { id: "about", group: "Go to", label: "About", run: go("/about") },
      { id: "resume", group: "Go to", label: "Résumé", run: go("/resume") },
      ...caseStudies.map((c) => ({
        id: c.slug,
        group: "Case studies",
        label: c.title,
        hint: c.kicker,
        run: go(`/work/${c.slug}`),
      })),
      {
        id: "copy",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        run: () => void navigator.clipboard?.writeText(profile.email),
      },
      { id: "theme", group: "Actions", label: "Toggle light and dark theme", run: toggleTheme },
      { id: "mail", group: "Links", label: "Send an email", run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "gh", group: "Links", label: "GitHub", run: out(profile.github) },
      { id: "li", group: "Links", label: "LinkedIn", run: out(profile.linkedin) },
    ];
  }, [router]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const open = () => {
      const el = dialog.current;
      if (!el || el.open) return;
      setQuery("");
      setActive(0);
      el.showModal();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE, open);
    };
  }, []);

  const run = (c: Command | undefined) => {
    if (!c) return;
    dialog.current?.close();
    c.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  };

  return (
    <dialog
      ref={dialog}
      aria-label="Command menu"
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-2xl border border-line-2 bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-4 shrink-0 text-ink-3" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Search pages, projects, and actions"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          className="h-13 w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-ink-3"
        />
        <span className="kbd">esc</span>
      </div>

      <ul id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-ink-3">Nothing matches that.</li>
        )}
        {results.map((c, i) => {
          const heading = i === 0 || results[i - 1].group !== c.group ? c.group : null;
          return (
            <li key={c.id} role="presentation">
              {heading && <div className="label px-3 pt-3 pb-1.5">{heading}</div>}
              <button
                id={`cmd-${c.id}`}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => run(c)}
                className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${
                  i === active ? "bg-accent-wash text-ink" : "text-ink-2"
                }`}
              >
                <span>{c.label}</span>
                {c.hint && <span className="truncate font-mono text-[11px] text-ink-3">{c.hint}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
