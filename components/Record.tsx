"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";
import { ACHIEVEMENTS, type AchCat } from "@/lib/content";

const CATS: ("All" | AchCat)[] = ["All", "Products", "Engineering", "Community", "Business"];

/**
 * The record: every achievement as a ledger. A spine draws down as you scroll, rows slide in,
 * metrics count. Filter chips re-sort the list with a fade-and-rise.
 */
export default function Record() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const spine = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const rows = ACHIEVEMENTS.map((a, i) => ({ ...a, i })).filter((a) => cat === "All" || a.cat === cat);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(spine.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: list.current, start: "top 75%", end: "bottom 60%", scrub: true } });
      ScrollTrigger.batch(".rec-row", {
        start: "top 90%",
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // filter change: rows that are already there re-enter with a rise
  useEffect(() => {
    if (reduced() || !list.current) return;
    const els = list.current.querySelectorAll(".rec-row");
    gsap.fromTo(els, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.04, overwrite: true });
    ScrollTrigger.refresh();
  }, [cat]);

  return (
    <section className="record" ref={root} id="record">
      <div className="sec-head">
        <h2 data-reveal>
          The <em>record.</em>
        </h2>
        <p>Everything that shipped, with the number that proves it. Tap a row for the detail.</p>
      </div>
      <div className="rec-filters" role="tablist">
        {CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => { setCat(c); setOpen(null); }} data-cursor-hide="">
            {c}
            <span>{c === "All" ? ACHIEVEMENTS.length : ACHIEVEMENTS.filter((a) => a.cat === c).length}</span>
          </button>
        ))}
      </div>
      <div className="rec-wrap">
        <div className="rec-spine" ref={spine} aria-hidden />
        <ol className="rec-list" ref={list}>
          {rows.map((a, k) => (
            <li className={`rec-row${open === a.i ? " open" : ""}`} key={a.i} style={{ ["--d" as string]: `${k * 0.03}s` }}>
              <button onClick={() => setOpen(open === a.i ? null : a.i)} aria-expanded={open === a.i} data-cursor={open === a.i ? "Close" : "Open"}>
                <span className="yr mono">{a.year}</span>
                <span className="dot" aria-hidden />
                <span className="t">
                  <b>{a.title}</b>
                  <span className="cat mono">{a.cat}</span>
                </span>
                <span className="metric">
                  <b>{a.metric}</b>
                  <small>{a.unit}</small>
                </span>
                <span className="plus" aria-hidden><i /><i /></span>
              </button>
              <div className="detail"><p>{a.detail}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
