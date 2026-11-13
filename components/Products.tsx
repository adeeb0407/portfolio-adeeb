"use client";

import { useEffect, useRef } from "react";
import { FlapRow } from "@/lib/flap";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";
import { PRODUCTS } from "@/lib/content";
import Device from "./Device";

const SOON = ["OPENING SOON", "GYMS, LINKED", "TRAIN AS ONE", "OPENING SOON"];

/** Stacked product cards: each pins, the next slides over it and pushes it back. */
export default function Products() {
  const root = useRef<HTMLElement>(null);
  const soon = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = new FlapRow(soon.current!, 12);
    let k = 0;
    let iv = 0;
    const stop = () => { clearInterval(iv); iv = 0; };
    const st = ScrollTrigger.create({
      trigger: soon.current,
      start: "top 90%",
      end: "bottom 10%",
      onToggle: (self) => {
        if (!self.isActive) return stop();
        row.show(SOON[k], { ms: 60, maxSteps: 8, stagger: 40, instant: reduced() });
        if (reduced() || iv) return;
        iv = window.setInterval(() => {
          k = (k + 1) % SOON.length;
          row.show(SOON[k], { ms: 55, maxSteps: 5, stagger: 30 });
        }, 4200);
      },
    });

    const ctx = gsap.context(() => {
      if (reduced()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".pcard");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (next) {
          gsap.fromTo(card, { scale: 1 }, {
            scale: 0.9,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 5%", scrub: true },
          });
          gsap.fromTo(card.querySelector(".pc-dim"), { opacity: 0 }, {
            opacity: 0.45,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 5%", scrub: true },
          });
        }
        gsap.fromTo(card.querySelectorAll(".vis .dev"), { yPercent: 10 }, {
          yPercent: -6,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(card.querySelectorAll(".stats > div"), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: card, start: "top 60%", once: true },
        });
      });
    }, root);

    return () => {
      st.kill();
      clearInterval(iv);
      ctx.revert();
    };
  }, []);

  return (
    <section className="products" ref={root} id="products">
      <div className="sec-head">
        <h2 data-reveal>
          Things I <em>own</em>
          <br />
          and ship.
        </h2>
        <p>Three Pronttera products, co-created with the team. One idea runs through all of them: the business keeps its customers.</p>
      </div>
      {PRODUCTS.map((p) => (
        <article
          key={p.id}
          className={`pcard ${p.id}`}
          style={{ ["--bg" as string]: p.theme.bg, ["--fg" as string]: p.theme.ink }}
        >
          <i className="pc-dim" aria-hidden />
          <div className="txt">
            <div className="kick mono">
              {p.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt="" />
              )}
              {p.kicker}
            </div>
            <div>
              <h3>{p.name}</h3>
              <p className="line">{p.line}</p>
              <p className="body">{p.body}</p>
              <div className="stats">
                {p.stats.map((s) => (
                  <div key={s.s}>
                    <b>{s.b}</b>
                    <span>{s.s}</span>
                  </div>
                ))}
              </div>
              {p.href ? (
                <a className="cta" href={p.href} target="_blank" rel="noopener" data-cursor="Open">
                  {p.cta} <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="cta" style={{ background: p.theme.accent, color: "#111" }}>{p.cta}</span>
              )}
            </div>
          </div>
          <div className="vis">
            {p.id === "tijarah" && (
              <div className="trio">
                {p.devices.phones?.map((src, k) => (
                  <Device key={src} kind="iphone" src={src} alt={`${p.name} screen ${k + 1}`} className={`ph${k + 1}`} />
                ))}
              </div>
            )}
            {p.id === "frostique" && (
              <div className="stack3">
                <Device kind="macbook" src={p.devices.laptop} alt="Frostique bakery dashboard on a laptop" className="lap" />
                <Device kind="ipad" src={p.devices.tablet} alt="Frostique analytics on a tablet" className="tab" />
                <Device kind="iphone" src={p.devices.phones?.[0]} alt="Frostique storefront on a phone" className="ph" />
              </div>
            )}
            {p.id === "fitstack" && (
              <>
                <div className="soon" ref={soon} aria-label="Opening soon" />
                <div className="plates" aria-hidden>
                  <i style={{ width: 22, height: 120 }} />
                  <i style={{ width: 30, height: 170 }} />
                  <i style={{ width: 36, height: 210 }} />
                  <i className="bar" />
                  <i style={{ width: 36, height: 210 }} />
                  <i style={{ width: 30, height: 170 }} />
                  <i style={{ width: 22, height: 120 }} />
                </div>
              </>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
