"use client";

import { useEffect, useState } from "react";
import { OFF_CLOCK, PERSON } from "@/lib/content";

/** Hand-drawn line icons; strokes trace themselves when the card is hovered. */
function Icon({ name }: { name: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1 };
  return (
    <svg viewBox="0 0 64 64" width="72" height="72" aria-hidden className="ico">
      {name === "ball" && (
        <>
          <circle cx="32" cy="32" r="26" {...p} />
          <path d="M32 20l9 6.5-3.4 10.6H26.4L23 26.5z" {...p} />
          <path d="M32 20V7M41 26.5l12-4M37.6 37.1l7.6 10.4M26.4 37.1l-7.6 10.4M23 26.5l-12-4" {...p} />
        </>
      )}
      {name === "shuttle" && (
        <>
          <circle cx="32" cy="50" r="6" {...p} />
          <path d="M27 46L14 10M37 46L50 10M30 45L26 8M34 45L38 8M14 10q18 -7 36 0" {...p} />
          <path d="M18 22h28M21 32h22" {...p} />
        </>
      )}
      {name === "aim" && (
        <>
          <circle cx="32" cy="32" r="20" {...p} />
          <circle cx="32" cy="32" r="3" {...p} />
          <path d="M32 4v14M32 46v14M4 32h14M46 32h14" {...p} />
        </>
      )}
      {name === "play" && (
        <>
          <rect x="6" y="14" width="52" height="36" rx="10" {...p} />
          <path d="M27 24l12 8-12 8z" {...p} />
        </>
      )}
    </svg>
  );
}

export default function OffClock() {
  const [dc, setDc] = useState<{ online: number | null; members: number | null }>({ online: null, members: null });
  useEffect(() => {
    fetch("/api/discord").then((r) => r.json()).then((j) => setDc({ online: j.online, members: j.members })).catch(() => {});
  }, []);
  const discord = PERSON.links.find((l) => l.label === "Discord")!.href;
  return (
    <section className="offclock" id="life">
      <div className="sec-head">
        <h2 data-reveal>
          Off the <em>clock.</em>
        </h2>
        <p>Before the companies there was the pitch, the court and the lobby. They never left.</p>
      </div>
      <div className="cards">
        {OFF_CLOCK.map((c) => (
          <div className="card" key={c.k}>
            <div className="g"><Icon name={c.glyph} /></div>
            <div>
              <h4>{c.k}</h4>
              <p>{c.v}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="trident">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/trident-gaming-logo.webp" alt="Trident Gaming logo" />
        <div>
          <b>TridentTM · Acronoid E-Sports</b>
          <span>
            {dc.online !== null ? `${dc.online} online now · ${dc.members} members` : "The Discord that ran CS:GO, PUBG Mobile and Valorant tournaments through lockdown."}
          </span>
        </div>
        <a href={discord} target="_blank" rel="noopener" data-cursor="Join">
          Join the Discord
        </a>
      </div>
    </section>
  );
}
