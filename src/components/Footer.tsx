import Link from "next/link";
import { nav, site } from "@/lib/content";
import { Github, Linkedin, Mail } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-2xl">{site.name}</div>
            <p className="mt-3 text-sm text-muted">
              Software engineer in {site.location}. Graduating May 2026 and looking
              for full-time work.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-muted transition-colors hover:border-lime hover:text-lime"
              >
                <Github />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-muted transition-colors hover:border-lime hover:text-lime"
              >
                <Linkedin />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-muted transition-colors hover:border-lime hover:text-lime"
              >
                <Mail />
              </a>
            </div>
          </div>

          <nav className="flex gap-16">
            <div>
              <div className="eyebrow mb-4">Pages</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-paper-dim transition-colors hover:text-lime">
                    Home
                  </Link>
                </li>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-paper-dim transition-colors hover:text-lime">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-4">Elsewhere</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-paper-dim transition-colors hover:text-lime">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-paper-dim transition-colors hover:text-lime">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-paper-dim transition-colors hover:text-lime">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name.toUpperCase()}</span>
          <span>NEXT.JS · TYPESCRIPT · TAILWIND</span>
        </div>
      </div>
    </footer>
  );
}
