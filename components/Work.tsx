"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { WORK } from "@/lib/content";

/** Client work as a list. A preview window follows the cursor and slides to the hovered project. */
export default function Work() {
  const prev = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = prev.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
    const rot = gsap.quickTo(el, "rotation", { duration: 0.6, ease: "power3" });
    let lx = 0;
    const move = (e: PointerEvent) => {
      x(e.clientX - 190);
      y(e.clientY - 135);
      rot(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.4));
      lx = e.clientX;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="work" id="work">
      <div className="sec-head">
        <h2 data-reveal>
          Built for <em>clients.</em>
        </h2>
        <p>Through Pronttera: healthcare, fintech, retail and AI, from discovery to production on AWS.</p>
      </div>
      <ul onPointerLeave={() => setActive(-1)}>
        {WORK.map((w, i) => (
          <li key={w.name} onPointerEnter={() => setActive(i)}>
            <a href={w.href} target="_blank" rel="noopener" data-cursor="View">
              <span className="n">{w.name}</span>
              <span className="d">{w.what}</span>
              <span className="t">
                {w.tag} · {w.year}
              </span>
              <span className="ar" aria-hidden>
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className={`preview${active >= 0 ? " on" : ""}`} ref={prev} aria-hidden>
        <div className="slide" style={{ transform: `translateY(${-Math.max(0, active) * 100}%)` }}>
          {WORK.map((w) => (
            <div key={w.name} style={{ height: "100%" }}>
              {w.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={w.img} alt="" />
              ) : (
                <div className="ph">{w.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
