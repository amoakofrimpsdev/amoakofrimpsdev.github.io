/** Flip the theme on <html> and remember the choice. */
export function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be unavailable (private mode). The toggle still works for this visit.
  }
}

/** Runs inline in <head>, before first paint, so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t&&matchMedia("(prefers-color-scheme: dark)").matches)t="dark";if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
