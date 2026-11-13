"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";
import { QUOTES } from "@/lib/content";

/** Client quotes: one at a time, words rising in, auto-advancing while on screen. */
export default function Quotes() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 75%", end: "bottom 25%", onToggle: (s) => setOnScreen(s.isActive) });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!onScreen) return;
    const iv = setTimeout(() => setI((v) => (v + 1) % QUOTES.length), 6500);
    return () => clearTimeout(iv);
  }, [i, onScreen]);

  useEffect(() => {
    if (reduced()) return;
    const words = root.current!.querySelectorAll(".qw > span");
    gsap.fromTo(words, { yPercent: 110, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 0.9, ease: "expo.out", stagger: 0.035 });
    gsap.fromTo(root.current!.querySelector(".qby"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "expo.out" });
  }, [i]);

  const q = QUOTES[i];
  return (
    <section className="quotes" ref={root} id="quotes">
      <div className="mono qhead">
        <span>Client words</span>
        <span>{String(i + 1).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}</span>
      </div>
      <blockquote key={i}>
        <span className="qmark" aria-hidden>“</span>
        {q.q.split(" ").map((w, k) => (
          <span key={k}>
            <span className="qw">
              <span>{w}</span>
            </span>{" "}
          </span>
        ))}
      </blockquote>
      <div className="qby">
        <b>{q.by}</b> · {q.role}
      </div>
      <div className="qnav">
        {QUOTES.map((x, k) => (
          <button key={x.by} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Quote from ${x.by}`} data-cursor="Read">
            <span />
          </button>
        ))}
      </div>
      <p className="qsrc mono">As published in Pronttera case studies</p>
    </section>
  );
}
