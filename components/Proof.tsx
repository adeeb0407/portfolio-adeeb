"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion";
import { PROOF } from "@/lib/content";

/** Each digit is a reel 0-9 twice over; on view it spins down to its digit. */
function Odometer({ value }: { value: string }) {
  return (
    <div className="num" aria-label={value}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span className="reel" key={i} data-d={ch}>
            <span>
              {Array.from({ length: 20 }).map((_, k) => (
                <span key={k}>{k % 10}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </div>
  );
}

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>(".cell").forEach((cell, ci) => {
        const reels = cell.querySelectorAll<HTMLElement>(".reel > span");
        reels.forEach((strip, i) => {
          const d = Number((strip.parentElement as HTMLElement).dataset.d);
          const target = -(10 + d) / 20;
          if (reduced()) {
            gsap.set(strip, { yPercent: target * 100 });
            return;
          }
          gsap.fromTo(
            strip,
            { yPercent: 0 },
            {
              yPercent: target * 100,
              duration: 1.6 + i * 0.18,
              ease: "expo.out",
              delay: (ci % 3) * 0.08,
              scrollTrigger: { trigger: cell, start: "top 85%", once: true },
            },
          );
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="proof" ref={root}>
      <div className="grid">
        {PROOF.map((p) => (
          <div className="cell" key={p.label}>
            <Odometer value={p.value} />
            <div className="lab">{p.label}</div>
            <div className="note">{p.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
