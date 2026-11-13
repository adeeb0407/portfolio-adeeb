"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/motion";

export default function Progress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`; } });
    return () => st.kill();
  }, []);
  return <div className="progress" ref={bar} aria-hidden />;
}
