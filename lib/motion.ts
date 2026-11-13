"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The intro (preloader) dispatches this once; sections wait for it before animating in. */
export const INTRO_EVENT = "adeeb:intro";
let introDone = false;
export function markIntroDone() {
  introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
  // layout is final now (fonts in, pins placed): re-measure every trigger
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
export function onIntro(fn: () => void) {
  if (introDone) {
    fn();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, fn, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, fn);
}

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => (lenis = l);
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: "smooth" });
}
