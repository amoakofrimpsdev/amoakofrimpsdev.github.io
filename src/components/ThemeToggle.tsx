"use client";

import { toggleTheme } from "@/lib/theme";
import { Moon, Sun } from "./icons";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className="grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      {/* Which icon shows is decided in CSS from data-theme, so there is no hydration mismatch. */}
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
