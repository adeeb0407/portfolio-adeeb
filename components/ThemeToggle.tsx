"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function current(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Sun / moon switch. The initial theme is applied by an inline script in the layout, before paint. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const t = current();
    const id = requestAnimationFrame(() => setTheme(t));
    return () => cancelAnimationFrame(id);
  }, []);
  const flip = () => {
    const next: Theme = current() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };
  return (
    <button className="tt" onClick={flip} aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"} data-cursor-hide="">
      <span className={`tt-knob ${theme}`} aria-hidden>
        <svg viewBox="0 0 24 24" className="sun"><circle cx="12" cy="12" r="4.2" fill="currentColor" /><g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" /></g></svg>
        <svg viewBox="0 0 24 24" className="moon"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor" /></svg>
      </span>
    </button>
  );
}
