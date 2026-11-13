"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion";
import { STATEMENT } from "@/lib/content";

/** Little image pills set inline after these words, like an editorial spread. */
const CHIPS: Record<string, string> = {};

type Tok = { w: string; hl: boolean };
function tokens(s: string): Tok[] {
  const out: Tok[] = [];
  const re = /\[([^\]]+)\]|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m[1]) m[1].split(" ").forEach((w) => out.push({ w, hl: true }));
    else out.push({ w: m[2], hl: false });
  }
  return out;
}

export default function Statement() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduced()) {
      gsap.set(root.current!.querySelectorAll(".w"), { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(".statement .w", {
        opacity: 1,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 65%", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const toks = tokens(STATEMENT);
  return (
    <section className="statement" ref={root} id="story">
      <div className="mono">The short version</div>
      <p>
        {toks.map((t, i) => (
          <span key={i}>
            <span className={`w${t.hl ? " hl" : ""}`}>{t.w}</span>
            {CHIPS[t.w] && (
              <span className="w chip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CHIPS[t.w]} alt="" />
              </span>
            )}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
