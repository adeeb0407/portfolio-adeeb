"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced, ScrollTrigger } from "@/lib/motion";
import { AI_TAKE } from "@/lib/content";
import Device from "./Device";

/** A prompt box that types the agent's own suggested questions, one after another. */
function PromptDemo({ prompts, name }: { prompts: string[]; name: string }) {
  const [text, setText] = useState("");
  const [state, setState] = useState<"typing" | "answered">("typing");
  const live = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: wrap.current, start: "top 85%", end: "bottom 10%", onToggle: (s) => { live.current = s.isActive; } });
    let i = 0, k = 0, cancelled = false;
    let timer = 0;
    const step = () => {
      if (cancelled) return;
      if (!live.current) { timer = window.setTimeout(step, 400); return; }
      const q = prompts[i];
      if (k < q.length) {
        k++;
        setText(q.slice(0, k));
        setState("typing");
        timer = window.setTimeout(step, 28 + Math.random() * 40);
      } else {
        setState("answered");
        timer = window.setTimeout(() => {
          i = (i + 1) % prompts.length;
          k = 0;
          setText("");
          step();
        }, 2600);
      }
    };
    timer = window.setTimeout(() => {
      if (reduced()) { setText(prompts[0]); setState("answered"); }
      else step();
    }, reduced() ? 0 : 600);
    return () => { cancelled = true; clearTimeout(timer); st.kill(); };
  }, [prompts]);

  return (
    <div className="pdemo" ref={wrap}>
      <div className="pd-box">
        <span className="pd-text">{text}<i className="caret" /></span>
        <span className={`pd-send${state === "answered" ? " on" : ""}`} aria-hidden>↑</span>
      </div>
      <div className={`pd-trace mono${state === "answered" ? " on" : ""}`}>
        <span><i /> {name} · query shown · answered from allowed views only</span>
      </div>
    </div>
  );
}

export default function Agents() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".ai-line", { yPercent: 110, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.14, scrollTrigger: { trigger: ".ai-take", start: "top 75%", once: true } });
      gsap.from(".prin", { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: ".prins", start: "top 85%", once: true } });
      gsap.from(".agent", { y: 50, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: ".agents-grid", start: "top 80%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ai" ref={root} id="ai">
      <div className="ai-take">
        <div className="mono"><span className="live-dot" /> {AI_TAKE.kicker} · 2026</div>
        <h2>
          {AI_TAKE.lines.map((l, i) => (
            <span className="ai-ln" key={i}><span className="ai-line">{l}</span></span>
          ))}
        </h2>
      </div>
      <div className="prins">
        {AI_TAKE.principles.map((p, i) => (
          <div className="prin" key={p.k}>
            <span className="mono">0{i + 1}</span>
            <b>{p.k}</b>
            <p>{p.v}</p>
          </div>
        ))}
      </div>
      <div className="agents-head">
        <h3>Two agents, live.</h3>
        <p>Built through Pronttera in 2026. Both answer plain-English questions from the client&apos;s own database, under the signed-in role&apos;s permissions.</p>
      </div>
      <div className="agents-grid">
        {AI_TAKE.agents.map((a) => (
          <article className="agent" key={a.name}>
            <a className="ag-shot" href={a.href} target="_blank" rel="noopener" data-cursor="Open">
              <Device kind="macbook" src={a.shot} alt={`${a.name} interface`} />
            </a>
            <div className="ag-top">
              <div>
                <h4>{a.name}</h4>
                <span className="mono">{a.who}</span>
              </div>
              <a href={a.href} target="_blank" rel="noopener" data-cursor="Open">Open ↗</a>
            </div>
            <p>{a.what}</p>
            <PromptDemo prompts={a.prompts} name={a.name} />
            <ul className="chips">
              <li>Read-only</li><li>Every query shown</li><li>Role-based guardrails</li><li>Refuses out-of-scope</li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
