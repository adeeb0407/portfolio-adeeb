"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, scrollToId } from "@/lib/motion";
import { PERSON, PRODUCTS, STACK, WORK } from "@/lib/content";

type Line = { t: "in" | "out" | "ok" | "err"; s: string };

const HELP = ["whoami", "story", "ragnarok", "ai", "products", "clients", "stack", "github", "socials", "contact", "sudo hire-adeeb", "clear"];

function run(cmd: string, pushes: number | null): Line[] {
  const c = cmd.trim().toLowerCase();
  const out = (s: string): Line => ({ t: "out", s });
  switch (c) {
    case "help":
    case "ls":
      return [out("commands: " + HELP.join(" · "))];
    case "whoami":
      return [out("Adeeb Shah. Founder & CEO of Pronttera. Full-stack product engineer."), out("Pune → Auckland → Dubai. Shipping since 2013, building since sixteen.")];
    case "story":
      return [
        out("2013  YouTube as TridentTM, aged 11"),
        out("2017  Acronoid + Zodiac Ragnarok servers, ~15,000 online"),
        out("2019  Acronoid E-Sports, tournaments through lockdown"),
        out("2020  Amazon, database engineer"),
        out("2022  Smartle, then Techwondoe in Auckland"),
        out("2024  Founded Pronttera"),
        out("2025  Tijarah and Frostique live"),
        out("2026  Moved to Dubai. Learned sales and marketing. Shipped AI agents. FitStack boarding"),
      ];
    case "ragnarok":
      return [out("Two private Ragnarok Online servers, Acronoid and Zodiac."), out("Built on rAthena with kRO client files. Hosted in India and the Philippines."), out("Community grown on Facebook. Around 15,000 players online. He was 16.")];
    case "ai":
    case "agents":
      return [
        out("Two agents live in 2026, both answering plain English from a client's own database:"),
        out("  Rafai AI          logistics analytics   rafai-ai-interface.vercel.app"),
        out("  ClinicSoft Agent  clinic group, 977k records   emr-ai-umber.vercel.app/ask"),
        out("Rules: evals not vibes · read-only by default · every query shown · tool layer between model and data."),
        out("On the bubble: valuations, yes. Usefulness, no. AGI is a headline; agents that do work are products."),
      ];
    case "products":
      return PRODUCTS.map((p) => out(`${p.name.padEnd(10)} ${p.kicker}`));
    case "clients":
      return WORK.map((w) => out(`${w.name.padEnd(12)} ${w.what}`));
    case "stack":
      return [out(STACK.slice(0, 19).join(" · ")), out(STACK.slice(19).join(" · "))];
    case "github":
      return [out(`${pushes ?? "?"} pushes in the last 30 days (public repos only).`), { t: "ok", s: "→ github.com/adeeb0407" }];
    case "socials":
      return PERSON.links.map((l) => out(`${l.label.padEnd(10)} ${l.href.replace("https://", "")}`));
    case "contact":
      return [out(`email ${PERSON.email}`), { t: "ok", s: "scrolling to contact…" }];
    case "sudo hire-adeeb":
    case "sudo hire adeeb":
      return [{ t: "ok", s: "[sudo] permission granted." }, out("Opening a channel… say hi at " + PERSON.email)];
    case "sudo rm -rf /":
      return [{ t: "err", s: "nice try." }];
    case "":
      return [];
    default:
      return [{ t: "err", s: `command not found: ${cmd}. try 'help'` }];
  }
}

/** A real, typeable terminal about Adeeb. Runs `whoami` by itself when it scrolls into view. */
export default function Terminal() {
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [lines, setLines] = useState<Line[]>([{ t: "out", s: "adeeb-os 2026.11 · type 'help' or tap a command below" }]);
  const [val, setVal] = useState("");
  const [pushes, setPushes] = useState<number | null>(null);
  const history = useRef<string[]>([]);
  const hi = useRef(-1);

  useEffect(() => {
    fetch("/api/github").then((r) => r.json()).then((j) => setPushes(j.pushes30 ?? null)).catch(() => {});
  }, []);

  const exec = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    if (c === "clear") {
      setLines([]);
      return;
    }
    history.current.unshift(cmd);
    hi.current = -1;
    setLines((l) => [...l, { t: "in", s: cmd }, ...run(cmd, pushes)]);
    if (c === "contact" || c.startsWith("sudo hire")) setTimeout(() => scrollToId("contact"), 900);
    if (c === "github") window.open("https://github.com/adeeb0407", "_blank", "noopener");
  };

  // type a command out character by character, then run it
  const typeOut = (cmd: string) => {
    let k = 0;
    const tick = () => {
      k++;
      setVal(cmd.slice(0, k));
      if (k < cmd.length) setTimeout(tick, 45);
      else setTimeout(() => { exec(cmd); setVal(""); }, 220);
    };
    tick();
  };

  useEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 70%", once: true, onEnter: () => setTimeout(() => typeOut("whoami"), 400) });
    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const b = body.current!;
    gsap.to(b, { scrollTop: b.scrollHeight, duration: 0.4, ease: "power2.out" });
  }, [lines]);

  return (
    <div className="term" ref={root} onClick={() => input.current?.focus({ preventScroll: true })}>
      <div className="tbar">
        <i /><i /><i />
        <span className="mono">adeeb@pronttera: ~</span>
      </div>
      <div className="tbody" ref={body} data-lenis-prevent>
        {lines.map((l, i) => (
          <div key={i} className={`tl ${l.t}`}>
            {l.t === "in" ? <><b>➜</b> <em>~</em> {l.s}</> : l.s}
          </div>
        ))}
        <form
          className="tl in live"
          onSubmit={(e) => {
            e.preventDefault();
            exec(val);
            setVal("");
          }}
        >
          <b>➜</b> <em>~</em>
          <input
            ref={input}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                hi.current = Math.min(history.current.length - 1, hi.current + 1);
                setVal(history.current[hi.current] ?? "");
              }
              if (e.key === "ArrowDown") {
                hi.current = Math.max(-1, hi.current - 1);
                setVal(history.current[hi.current] ?? "");
              }
            }}
            aria-label="Terminal command"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </form>
      </div>
      <div className="tchips">
        {["whoami", "ragnarok", "ai", "story", "stack", "sudo hire-adeeb"].map((c) => (
          <button key={c} onClick={(e) => { e.stopPropagation(); typeOut(c); }} data-cursor="Run">
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
