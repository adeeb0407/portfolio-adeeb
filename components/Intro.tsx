"use client";

import { useEffect } from "react";
import { markIntroDone } from "@/lib/motion";

/** No loading screen: wait briefly for fonts and the portrait, then start the hero. */
export default function Intro() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const img = new Image();
    img.src = "/portrait/adeeb-cut.webp";
    const ready = Promise.all([document.fonts.ready, img.decode().catch(() => undefined)]);
    const cap = new Promise((r) => setTimeout(r, 700));
    let done = false;
    Promise.race([ready, cap]).then(() => {
      if (done) return;
      done = true;
      document.documentElement.classList.add("ready");
      markIntroDone();
    });
    return () => { done = true; };
  }, []);
  return null;
}
