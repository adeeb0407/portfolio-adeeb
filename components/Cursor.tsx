"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

/** A dot that eases after the pointer and grows into a labelled disc over [data-cursor] targets. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      el.classList.toggle("big", !!t);
      el.classList.toggle("hide", !!(e.target as HTMLElement | null)?.closest("[data-cursor-hide]"));
      if (label.current) label.current.textContent = t?.dataset.cursor ?? "";
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div className="cursor" ref={ref} aria-hidden>
      <div className="dot">
        <span ref={label} />
      </div>
    </div>
  );
}
