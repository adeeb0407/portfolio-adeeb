"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";
import { STACK } from "@/lib/content";
import Terminal from "./Terminal";

/** How he builds: a terminal you can type into, and a field of stack chips that scatter from the cursor. */
export default function Build() {
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = field.current!;
    const chips = Array.from(f.querySelectorAll<HTMLElement>(".chip2"));
    const setters = chips.map((c) => ({ x: gsap.quickTo(c, "x", { duration: 0.7, ease: "power3" }), y: gsap.quickTo(c, "y", { duration: 0.7, ease: "power3" }), r: gsap.quickTo(c, "rotation", { duration: 0.7, ease: "power3" }) }));
    let centers: { x: number; y: number }[] = [];
    const measure = () => {
      centers = chips.map((c) => {
        const r = c.getBoundingClientRect();
        const t = gsap.getProperty(c, "x") as number;
        const u = gsap.getProperty(c, "y") as number;
        return { x: r.left + r.width / 2 - t, y: r.top + r.height / 2 - u + window.scrollY };
      });
    };
    const move = (e: PointerEvent) => {
      if (!centers.length) measure();
      const py = e.clientY + window.scrollY;
      chips.forEach((_, i) => {
        const dx = centers[i].x - e.clientX, dy = centers[i].y - py;
        const d = Math.hypot(dx, dy);
        const f2 = Math.max(0, 1 - d / 170);
        setters[i].x((dx / (d || 1)) * f2 * 70);
        setters[i].y((dy / (d || 1)) * f2 * 70);
        setters[i].r((dx > 0 ? 1 : -1) * f2 * 14);
      });
    };
    const leave = () => setters.forEach((s) => { s.x(0); s.y(0); s.r(0); });
    f.addEventListener("pointerenter", measure);
    f.addEventListener("pointermove", move);
    f.addEventListener("pointerleave", leave);
    window.addEventListener("resize", measure);
    const ctx = gsap.context(() => {
      gsap.from(chips, { y: 40, opacity: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.02, scrollTrigger: { trigger: f, start: "top 85%", once: true } });
    }, f);
    return () => {
      f.removeEventListener("pointerenter", measure);
      f.removeEventListener("pointermove", move);
      f.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measure);
      ctx.revert();
    };
  }, []);

  return (
    <section className="build" id="build">
      <div className="sec-head">
        <h2 data-reveal>
          Ask the <em>terminal.</em>
        </h2>
        <p>It&apos;s real. Type a command, or tap one. Try <code>ragnarok</code>, or <code>sudo hire-adeeb</code>.</p>
      </div>
      <div className="build-grid">
        <Terminal />
        <div className="field-wrap">
          <div className="mono fl">The stack · move through it</div>
          <div className="field" ref={field}>
            {STACK.map((s, i) => (
              <span key={s} className={`chip2${i % 7 === 0 ? " hot" : ""}`}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
