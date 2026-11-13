"use client";

import { useEffect } from "react";
import { SplitText } from "gsap/SplitText";
import { gsap, reduced } from "@/lib/motion";

gsap.registerPlugin(SplitText);

/** Any element with [data-reveal] rises in line by line, masked, when it scrolls into view. */
export default function Reveal() {
  useEffect(() => {
    if (reduced()) return;
    const splits: SplitText[] = [];
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const s = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
      });
      splits.push(s);
    });
    return () => splits.forEach((s) => s.revert());
  }, []);
  return null;
}
