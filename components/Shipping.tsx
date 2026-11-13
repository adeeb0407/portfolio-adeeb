"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";

type Data = { pushes30: number | null; activeDays: number | null; repos: number | null; perDay: number[]; lastPushAt: string | null; labels: string[]; lastAgo: string };

function ago(iso: string | null, now: number) {
  if (!iso) return "··";
  const h = Math.round((now - new Date(iso).getTime()) / 3_600_000);
  if (h < 1) return "just now";
  if (h < 48) return `${h}h ago`;
  return `${Math.round(h / 24)} days ago`;
}

/** Live shipping log: real pushes per day for the last 30 days, straight from GitHub. */
export default function Shipping() {
  const root = useRef<HTMLElement>(null);
  const big = useRef<HTMLSpanElement>(null);
  const [d, setD] = useState<Data | null>(null);
  const [tip, setTip] = useState<{ i: number; n: number } | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((j) => {
        const now = Date.now();
        const labels = Array.from({ length: 30 }, (_, i) => new Date(now - (29 - i) * 86_400_000).toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
        setD({ ...j, labels, lastAgo: ago(j.lastPushAt, now) });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!d) return;
    const bars = root.current!.querySelectorAll<HTMLElement>(".bar i");
    const total = d.pushes30 ?? 0;
    if (reduced()) {
      bars.forEach((b) => (b.style.transform = "scaleY(1)"));
      if (big.current) big.current.textContent = String(total);
      return;
    }
    gsap.set(bars, { scaleY: 0 });
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(bars, { scaleY: 1, duration: 1.2, ease: "elastic.out(1, 0.6)", stagger: 0.025 });
        const o = { v: 0 };
        gsap.to(o, { v: total, duration: 2, ease: "expo.out", onUpdate: () => { if (big.current) big.current.textContent = String(Math.round(o.v)); } });
      },
    });
    return () => st.kill();
  }, [d]);

  const max = Math.max(1, ...(d?.perDay ?? [1]));
  const dayLabel = (i: number) => d?.labels[i] ?? "";

  return (
    <section className="shipping" ref={root} id="shipping">
      <div className="sh-l">
        <div className="mono"><span className="dotlive" /> Live from GitHub</div>
        <h2>
          Shipping, <em>live.</em>
        </h2>
        <div className="sh-big">
          <span ref={big}>0</span>
          <small>pushes in the last 30 days</small>
        </div>
        <div className="sh-stats">
          <div><b>{d?.activeDays ?? "··"}</b><span>active days of 30</span></div>
          <div><b>{d?.repos ?? "··"}</b><span>repositories</span></div>
          <div><b>{d?.lastAgo ?? "··"}</b><span>last push</span></div>
        </div>
        <p className="note">Public activity only. Most client work lives in private repositories.</p>
      </div>
      <div className="sh-r" onPointerLeave={() => setTip(null)}>
        <div className="bars">
          {(d?.perDay ?? Array(30).fill(0)).map((n, i) => (
            <div className="bar" key={i} onPointerEnter={() => setTip({ i, n })} data-cursor-hide="">
              <i style={{ height: `${Math.max(3, (n / max) * 100)}%`, opacity: n ? 1 : 0.25 }} />
            </div>
          ))}
        </div>
        <div className="axis mono">
          <span>{dayLabel(0)}</span>
          <span>{tip ? `${dayLabel(tip.i)} · ${tip.n} push${tip.n === 1 ? "" : "es"}` : "Hover a day"}</span>
          <span>Today</span>
        </div>
      </div>
    </section>
  );
}
