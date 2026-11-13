"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion";
import { CHAPTERS } from "@/lib/content";
import Device from "./Device";

function Glyph({ name }: { name?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "pc")
    return (
      <svg viewBox="0 0 120 120" className="cg">
        <rect x="34" y="14" width="52" height="92" rx="6" {...p} />
        <circle cx="60" cy="34" r="8" {...p} />
        <path d="M44 56h32M44 66h32M44 76h20M56 96h8" {...p} />
      </svg>
    );
  if (name === "db")
    return (
      <svg viewBox="0 0 120 120" className="cg">
        <ellipse cx="60" cy="26" rx="34" ry="11" {...p} />
        <path d="M26 26v68c0 6 15 11 34 11s34-5 34-11V26M26 49c0 6 15 11 34 11s34-5 34-11M26 72c0 6 15 11 34 11s34-5 34-11" {...p} />
      </svg>
    );
  if (name === "akl")
    return (
      <svg viewBox="0 0 160 120" className="cg">
        <path d="M10 88 Q 80 10 150 60" {...p} strokeDasharray="4 7" />
        <path d="M138 50l14 10-16 4" {...p} />
        <text x="80" y="112" textAnchor="middle" fontSize="30" fontWeight="900" fill="currentColor" fontFamily="var(--f-display)">PNQ → AKL</text>
      </svg>
    );
  if (name === "ro")
    return (
      <div className="ro-vis">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ro-logo" src="/brand/ragnarok-online.webp" alt="Ragnarok Online logo" loading="lazy" />
        <div className="ro-servers" aria-label="Servers he ran">
          <div className="ro-h mono"><span>Select server</span><span>2017</span></div>
          {[
            ["Acronoid", "rAthena · kRO"],
            ["Zodiac", "rAthena · kRO"],
          ].map(([n, s]) => (
            <div className="ro-row" key={n}>
              <i className="d" aria-hidden />
              <b>{n}</b>
              <span className="mono">{s}</span>
              <span className="st mono">Online</span>
            </div>
          ))}
          <div className="ro-load" aria-hidden><i /></div>
          <div className="ro-f mono">~15,000 players online · India + Philippines</div>
        </div>
        <div className="ro-note mono">Fan-run private servers · Ragnarok Online © Gravity</div>
      </div>
    );
  if (name === "dxb")
    return (
      <svg viewBox="0 0 160 120" className="cg">
        <path d="M18 92h124M30 92V58h14v34M52 92V40h16v52M76 92V22h18v70M102 92V50h14v42M124 92V66h12v26" {...p} />
        <path d="M85 8v10M80 13h10" {...p} />
        <text x="80" y="114" textAnchor="middle" fontSize="18" fontWeight="900" fill="currentColor" fontFamily="var(--f-display)">PNQ → DXB</text>
      </svg>
    );
  return null;
}

/** The long version: a pinned horizontal run through eight chapters (vertical on phones). */
export default function Chapters() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth + 48;
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (count.current) count.current.textContent = String(Math.min(CHAPTERS.length, 1 + Math.floor(self.progress * CHAPTERS.length))).padStart(2, "0");
          },
        },
      });
      // inside each card: the year drifts and the visual parallaxes against the scroll
      gsap.utils.toArray<HTMLElement>(".chap").forEach((card) => {
        gsap.fromTo(card.querySelector(".yr"), { xPercent: 18 }, { xPercent: -18, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        gsap.fromTo(card.querySelector(".vis-in"), { xPercent: 10, scale: 1.08 }, { xPercent: -10, scale: 1, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    });
    mm.add("(max-width: 900px)", () => {
      gsap.utils.toArray<HTMLElement>(".chap").forEach((card) => {
        gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%", once: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="chapters" ref={root} id="chapters">
      <div className="ch-head">
        <div>
          <div className="mono">The long version</div>
          <h2>
            Thirteen years, <em>{["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][CHAPTERS.length]} chapters.</em>
          </h2>
        </div>
        <div className="ch-meter mono">
          <span ref={count}>01</span> / {String(CHAPTERS.length).padStart(2, "0")}
          <div className="ch-bar"><div ref={bar} /></div>
        </div>
      </div>
      <div className="ch-track" ref={track}>
        {CHAPTERS.map((c, i) => (
          <article className="chap" key={c.title} style={{ ["--tone" as string]: c.tone }}>
            <div className="txt">
              <div className="yr" aria-hidden>{c.year}</div>
              <div className="tag mono">
                <span>{String(i + 1).padStart(2, "0")}</span> {c.year} · {c.age}
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <ul>
                {c.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className={`vis${c.glyph === "ro" ? " vis-ro" : ""}`}>
              <div className="vis-in">
                {c.img && c.img.includes("/products/") ? (
                  <Device kind="iphone" src={c.img} alt="Tijarah on a phone" className="chap-phone" />
                ) : c.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.img} alt="" className="logo" loading="lazy" />
                ) : (
                  <Glyph name={c.glyph} />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
