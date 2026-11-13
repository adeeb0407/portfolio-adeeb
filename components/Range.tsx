"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";
import { RANGE } from "@/lib/content";

const HOLD = 5200;

/**
 * From architect to founder. A list of five pillars on the left; the active one fills the
 * panel on the right with its line, items and an outlined numeral. Advances on its own while
 * on screen, pauses when the pointer is over it. Stacks into an accordion on phones.
 */
export default function Range() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 70%", end: "bottom 30%", onToggle: (s) => setOnScreen(s.isActive) });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!onScreen || paused || reduced()) return;
    const t = setTimeout(() => setI((v) => (v + 1) % RANGE.length), HOLD);
    return () => clearTimeout(t);
  }, [i, onScreen, paused]);

  useEffect(() => {
    if (reduced() || !panel.current) return;
    const q = gsap.utils.selector(panel);
    gsap.fromTo(q(".rp-num"), { xPercent: 12, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1, ease: "expo.out" });
    gsap.fromTo(q(".rp-line, .rp-since"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.08 });
    gsap.fromTo(q(".rp-items li"), { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.07, delay: 0.1 });
  }, [i]);

  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: true } });
      gsap.from(".rg-item", { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".rg", start: "top 80%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const p = RANGE[i];
  return (
    <section className="range" ref={root} id="range" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="sec-head">
        <h2 data-reveal>
          From architect <em>to founder.</em>
        </h2>
        <p>2026 was the year the range widened: the engineer who designs the system now also sells it, markets it, ships agents with it, and leads the people building it.</p>
      </div>
      <div className="rg-axis mono" aria-hidden>
        <span>2013 · code</span>
        <div className="rg-bar"><div ref={bar} /></div>
        <span>2026 · company</span>
      </div>

      <div className="rg">
        <ol className="rg-list">
          {RANGE.map((r, k) => (
            <li className={`rg-item${k === i ? " on" : ""}`} key={r.n}>
              <button onClick={() => setI(k)} onPointerEnter={() => setI(k)} aria-current={k === i} data-cursor-hide="">
                <span className="n mono">{r.n}</span>
                <span className="t">{r.title}</span>
                <span className="s mono">since {r.since}</span>
                <i className="prog" style={{ animationDuration: `${HOLD}ms`, animationPlayState: paused || !onScreen ? "paused" : "running" }} />
              </button>
              {/* phones: the detail sits inside the item as an accordion */}
              <div className="rg-acc">
                <div>
                  <p className="rp-line">{r.line}</p>
                  <ul>{r.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="rg-panel" ref={panel} key={i}>
          <span className="rp-num" aria-hidden>{p.n}</span>
          <div className="rp-body">
            <span className="rp-since mono">{p.title} · since {p.since}</span>
            <p className="rp-line">{p.line}</p>
            <ul className="rp-items">
              {p.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
