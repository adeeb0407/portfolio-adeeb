"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, scrollToId } from "@/lib/motion";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "record", label: "Record" },
  { id: "ai", label: "AI" },
  { id: "products", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => ref.current?.classList.toggle("hide", self.direction === 1 && self.scroll() > 240),
    });
    return () => st.kill();
  }, []);
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };
  return (
    <header className="nav" ref={ref}>
      <a className="brand" href="#top" onClick={go("top")}>
        <span className="c dot" aria-hidden /> Adeeb Shah
      </a>
      <nav className="links">
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>
            {l.label}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
