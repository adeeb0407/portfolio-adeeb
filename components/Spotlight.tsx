"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion";

/**
 * The portrait. Black and white by default; a soft circle of colour follows the pointer
 * across it, and the whole card tilts slightly toward the cursor. Touch screens get a slow,
 * automatic colour sweep instead.
 */
export default function Spotlight({ src, alt }: { src: string; alt: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const c = card.current!;
    if (reduced()) { el.style.setProperty("--sr", "100%"); return; }
    const rx = gsap.quickTo(c, "rotationX", { duration: 0.9, ease: "power3" });
    const ry = gsap.quickTo(c, "rotationY", { duration: 0.9, ease: "power3" });
    const st = { r: 0 };
    const setR = () => el.style.setProperty("--sr", `${st.r}px`);
    let rect: DOMRect | null = null;
    let raf = 0;
    let px = 0, py = 0;
    const flush = () => {
      raf = 0;
      if (!rect) return;
      el.style.setProperty("--sx", `${px}px`);
      el.style.setProperty("--sy", `${py}px`);
      rx(-((py / rect.height) - 0.5) * 8);
      ry(((px / rect.width) - 0.5) * 10);
    };
    const move = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const enter = () => { rect = el.getBoundingClientRect(); gsap.to(st, { r: Math.max(120, el.clientWidth * 0.26), duration: 0.7, ease: "expo.out", onUpdate: setR }); };
    const leave = () => { rect = null; gsap.to(st, { r: 0, duration: 0.6, ease: "power3.inOut", onUpdate: setR }); rx(0); ry(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);

    let sweep: gsap.core.Timeline | null = null;
    if (window.matchMedia("(pointer: coarse)").matches) {
      const p = { x: 0.3, y: 0.3 };
      const apply = () => { el.style.setProperty("--sx", `${p.x * el.clientWidth}px`); el.style.setProperty("--sy", `${p.y * el.clientHeight}px`); };
      sweep = gsap.timeline({ repeat: -1, repeatDelay: 2.5, delay: 2 })
        .to(st, { r: el.clientWidth * 0.3, duration: 0.8, ease: "expo.out", onUpdate: setR })
        .to(p, { x: 0.7, y: 0.45, duration: 2.4, ease: "sine.inOut", onUpdate: apply }, "<")
        .to(st, { r: 0, duration: 0.7, ease: "power3.in", onUpdate: setR });
    }
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      sweep?.kill();
    };
  }, []);

  return (
    <div className="spot" ref={wrap} data-cursor-hide="">
      <div className="card" ref={card}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bw" src={src} alt={alt} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="col" src={src} alt="" aria-hidden draggable={false} />
        <i className="sweep" aria-hidden />
      </div>
    </div>
  );
}
