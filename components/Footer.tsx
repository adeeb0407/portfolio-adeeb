"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";
import { FLAP_CHARS, FlapRow } from "@/lib/flap";
import { PERSON } from "@/lib/content";

function puneTime() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
}

export default function Footer() {
  const mag = useRef<HTMLAnchorElement>(null);
  const tiles = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const t = () => setTime(puneTime());
    t();
    const iv = setInterval(t, 1000);
    const el = mag.current!;
    const area = el.parentElement!;
    const x = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.35);
      y((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => { x(0); y(0); };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    const WORD = "LET'S TALK";
    const row = new FlapRow(tiles.current!, WORD.length);
    const st = ScrollTrigger.create({
      trigger: tiles.current,
      start: "top 85%",
      once: true,
      onEnter: () => row.show(WORD, { ms: 60, maxSteps: 9, stagger: 70, instant: reduced() }),
    });
    const hov = row.cells.map((c, i) => {
      const h = () => c.to(FLAP_CHARS[1 + Math.floor(Math.random() * 26)], { ms: 60, maxSteps: 2 }).then(() => c.to(WORD[i], { ms: 55, maxSteps: 4 }));
      c.el.addEventListener("pointerenter", h);
      return () => c.el.removeEventListener("pointerenter", h);
    });
    return () => {
      st.kill();
      hov.forEach((h) => h());
      clearInterval(iv);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <footer className="foot" id="contact">
      <div className="big">
        <em data-reveal>Have something worth building?</em>
        <div className="tiles" ref={tiles} aria-label="Let's talk" />
      </div>
      <div className="mid">
        <a className="mail" href={`mailto:${PERSON.email}`} data-cursor="Write">
          {PERSON.email}
        </a>
        <div style={{ padding: 30 }}>
          <a className="magnet" ref={mag} href={`mailto:${PERSON.email}`} data-cursor="">
            <span>
              Start a
              <br />
              project
            </span>
          </a>
        </div>
      </div>
      <div className="bottom">
        <nav>
          {PERSON.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener">
              {l.label}
            </a>
          ))}
        </nav>
        <span className="mono">Pune · {time || "··:··:··"} IST</span>
        <span className="mono">© 2026 Adeeb Shah · Pronttera</span>
      </div>
    </footer>
  );
}
