"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/content/site";
import { OPEN_PALETTE } from "./CommandPalette";
import ThemeToggle from "./ThemeToggle";
import { Search } from "./icons";

const links = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
];

export default function Header() {
  const pathname = usePathname();
  const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE));

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5 text-[15px] font-medium tracking-tight">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md bg-ink font-serif text-[17px] leading-none text-bg transition-colors group-hover:bg-accent group-hover:text-white"
          >
            d
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
          <span className="sm:hidden">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-ink-2 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
              className="relative py-1 transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-0 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-px aria-[current=page]:after:bg-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            className="flex h-9 items-center gap-2 rounded-full border border-line pr-2 pl-3 text-sm text-ink-3 transition-colors hover:border-ink hover:text-ink"
          >
            <Search className="size-3.5" />
            <span className="md:hidden">Menu</span>
            <span className="hidden md:inline">Search</span>
            <span className="kbd hidden md:inline">⌘K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
