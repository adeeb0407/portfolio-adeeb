"use client";

import { useEffect, useRef, useState } from "react";
import Spotlight from "./Spotlight";
import { gsap, onIntro, reduced, ScrollTrigger, scrollToId } from "@/lib/motion";
import { PERSON } from "@/lib/content";

const INDEX = [
  ["01", "Tijarah", "10,000+ customers"],
  ["02", "Frostique", "0% commission"],
  ["03", "FitStack", "Boarding"],
];

function Letters({ text, className }: { text: string; className: string }) {
  return (
    <span className={`word ${className}`} aria-hidden>
      {text.split("").map((ch, i) => (
        <span className="ltr" key={i}>
          <span>{ch}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [pushes, setPushes] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github").then((r) => r.json()).then((j) => setPushes(typeof j.pushes30 === "number" ? j.pushes30 : null)).catch(() => {});
  }, []);

  useEffect(() => {
    if (pushes === null) return;
    if (!num.current) return;
    if (reduced()) { num.current.textContent = String(pushes); return; }
    const o = { v: 0 };
    gsap.to(o, { v: pushes, duration: 1.8, ease: "expo.out", delay: 0.4, onUpdate: () => { num.current!.textContent = String(Math.round(o.v)); } });
  }, [pushes]);

  useEffect(() => {
    const q = gsap.utils.selector(root);
    const letters = q(".ltr > span") as HTMLElement[];
    const instant = reduced();
    const el = root.current!;

    if (!instant) {
      gsap.set(q(".eyebrow, .tag .ln > span, .index a, .cta-row > *, .strip .m, .strip .cue"), { yPercent: 110, opacity: 0 });
      gsap.set(letters, { yPercent: 110, skewY: 5 });
      gsap.set(q(".index a b"), { scaleX: 0 });
      gsap.set(q(".h-visual"), { clipPath: "inset(0 0 100% 0)", scale: 1.1, filter: "blur(18px)", transformOrigin: "50% 100%" });
      gsap.set(q(".glow"), { opacity: 0, scale: 0.6 });
      gsap.set(q(".strip"), { "--line-w": 0 });
      gsap.set(q(".sweep"), { backgroundPosition: "50% -40%", opacity: 1 });
    }

    const off = onIntro(() => {
      if (instant) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(q(".glow"), { opacity: 1, scale: 1, duration: 2.2 }, 0)
        .to(q(".h-visual"), { clipPath: "inset(0 0 0% 0)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "expo.inOut" }, 0.1)
        .to(q(".sweep"), { backgroundPosition: "50% 140%", duration: 1.5, ease: "power2.inOut" }, 1.0)
        .to(q(".sweep"), { autoAlpha: 0, duration: 0.3 }, 2.4)
        .to(q(".eyebrow"), { yPercent: 0, opacity: 1, duration: 0.9 }, 0.4)
        .to(letters, { yPercent: 0, skewY: 0, duration: 1.2, stagger: 0.045 }, 0.5)
        .to(q(".tag .ln > span"), { yPercent: 0, opacity: 1, duration: 1, stagger: 0.09 }, 1.05)
        .to(q(".index a"), { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 1.25)
        .to(q(".index a b"), { scaleX: 1, duration: 1.1, ease: "expo.inOut", stagger: 0.1 }, 1.3)
        .to(q(".cta-row > *"), { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 1.6)
        .to(q(".strip"), { "--line-w": 1, duration: 1.4, ease: "expo.inOut" }, 1.7)
        .to(q(".strip .m, .strip .cue"), { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 2.0);
    });

    // letters near the pointer lift and flash; the glow follows at depth
    const ly = letters.map((l) => gsap.quickTo(l, "y", { duration: 0.5, ease: "power3" }));
    const gx = gsap.quickTo(q(".glow")[0], "x", { duration: 1.4, ease: "power3" });
    const gy = gsap.quickTo(q(".glow")[0], "y", { duration: 1.4, ease: "power3" });
    // letter centres are measured once and re-measured only after a scroll or resize,
    // so pointer moves never force a layout
    let centres: { x: number; y: number }[] | null = null;
    const dirty = () => { centres = null; };
    window.addEventListener("scroll", dirty, { passive: true });
    window.addEventListener("resize", dirty);
    const move = (e: PointerEvent) => {
      if (instant) return;
      gx((e.clientX / window.innerWidth - 0.5) * 60);
      gy((e.clientY / window.innerHeight - 0.5) * 40);
      if (!centres) centres = letters.map((l) => { const r = l.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 - (gsap.getProperty(l, "y") as number) }; });
      letters.forEach((l, i) => {
        const c = centres![i];
        const d = Math.hypot(e.clientX - c.x, e.clientY - c.y);
        const near = Math.max(0, 1 - d / 200);
        ly[i](-near * 10);
        const hot = near > 0.5;
        if (l.classList.contains("hot") !== hot) l.classList.toggle("hot", hot);
      });
    };
    const leave = () => letters.forEach((l, i) => { ly[i](0); l.classList.remove("hot"); });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);

    // magnetic buttons
    const mags = q(".cta-row a") as HTMLElement[];
    const magOff = mags.map((m) => {
      const x = gsap.quickTo(m, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      const y = gsap.quickTo(m, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
      const mv = (e: PointerEvent) => { const r = m.getBoundingClientRect(); x((e.clientX - (r.left + r.width / 2)) * 0.22); y((e.clientY - (r.top + r.height / 2)) * 0.3); };
      const lv = () => { x(0); y(0); };
      m.addEventListener("pointermove", mv); m.addEventListener("pointerleave", lv);
      return () => { m.removeEventListener("pointermove", mv); m.removeEventListener("pointerleave", lv); };
    });

    const ctx = gsap.context(() => {
      if (instant) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".h-copy"), { yPercent: -10, opacity: 0.15, ease: "none", scrollTrigger: st });
        gsap.to(q(".h-visual"), { yPercent: 14, scale: 0.96, ease: "none", scrollTrigger: st });
        gsap.to(q(".strip"), { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "35% top" } });
      });
    }, root);

    return () => {
      off();
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", dirty);
      window.removeEventListener("resize", dirty);
      magOff.forEach((f) => f());
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section className="hero" ref={root} id="top">
      <div className="bgfx" aria-hidden><i className="grid" /><i className="glow" /></div>

      <div className="h-stage">
      <div className="h-copy">
        <div className="eyebrow mono"><i className="live-dot" /> {PERSON.role} · Pune · Auckland · Dubai</div>
        <h1 className="name" aria-label={PERSON.name}>
          <Letters text={PERSON.first} className="w1" />
          <Letters text={PERSON.last} className="w2" />
        </h1>
        <p className="tag">
          <span className="ln"><span>I build big things,</span></span>
          <span className="ln"><span>and I <em>ship</em> them.</span></span>
        </p>
        <div className="index">
          {INDEX.map(([n, name, note]) => (
            <a key={n} href="#products" data-cursor="Go" onClick={(e) => { e.preventDefault(); scrollToId("products"); }}>
              <i>({n})</i>
              <span>{name}</span>
              <span>{note}</span>
              <b aria-hidden />
            </a>
          ))}
        </div>
        <div className="cta-row">
          <a className="btn solid" href="#products" data-cursor-hide="" onClick={(e) => { e.preventDefault(); scrollToId("products"); }}>
            See the work <span className="ar" aria-hidden><i>↓</i><i>↓</i></span>
          </a>
          <a className="btn ghost" href="#contact" data-cursor-hide="" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }}>
            Get in touch
          </a>
        </div>
      </div>

      <div className="h-visual">
        <Spotlight src="/portrait/adeeb-cut.webp" alt="Adeeb Shah, seated, in a dark pinstripe suit" />
      </div>
      </div>

      <div className="strip">
        <div className="m">
          <b>{pushes === null ? "Daily" : <span ref={num}>0</span>}</b>
          <span><i className="live-dot" /> {pushes === null ? "pushes to GitHub" : "pushes · last 30 days"}</span>
        </div>
        <div className="m"><b>10,000+</b><span>Tijarah customers</span></div>
        <div className="m"><b>15,000</b><span>players online at 16</span></div>
        <div className="m"><b>2013</b><span>shipping since</span></div>
        <div className="cue mono" aria-hidden><span>Scroll</span><i /></div>
      </div>
    </section>
  );
}
