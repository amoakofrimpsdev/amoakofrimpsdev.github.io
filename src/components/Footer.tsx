import Link from "next/link";
import { profile } from "@/content/site";

export default function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript, and Tailwind.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/resume" className="hover:text-ink">Résumé</Link>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="hover:text-ink">Email</a>
        </nav>
      </div>
    </footer>
  );
}
