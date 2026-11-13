/**
 * Split-flap engine. Each cell is four layers: the static top and bottom halves, and two
 * leaves that rotate on the hinge. Flipping A -> B: the top leaf (A) falls from 0 to -90deg,
 * then the bottom leaf (B) lands from 90deg to 0. Uses the Web Animations API, no re-renders.
 */

export const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/>.-'";

function half(cls: string, ch: string) {
  const s = document.createElement("span");
  s.className = `fh ${cls}`;
  const i = document.createElement("span");
  i.textContent = ch;
  s.appendChild(i);
  return s;
}

export class FlapCell {
  el: HTMLSpanElement;
  private top: HTMLSpanElement;
  private bot: HTMLSpanElement;
  private leafTop: HTMLSpanElement;
  private leafBot: HTMLSpanElement;
  current = " ";
  private busy: Promise<void> = Promise.resolve();

  constructor(initial = " ") {
    this.el = document.createElement("span");
    this.el.className = "flap";
    this.top = half("top", initial);
    this.bot = half("bot", initial);
    this.leafTop = half("top leaf", initial);
    this.leafBot = half("bot leaf", initial);
    this.leafTop.style.visibility = "hidden";
    this.leafBot.style.visibility = "hidden";
    this.el.append(this.top, this.bot, this.leafTop, this.leafBot);
    this.current = initial;
  }

  private setText(h: HTMLSpanElement, ch: string) {
    (h.firstChild as HTMLSpanElement).textContent = ch === " " ? " " : ch;
  }

  /** One physical flip from the current character to `next`. */
  private async flipOnce(next: string, ms: number) {
    const prev = this.current;
    this.setText(this.top, next);
    this.setText(this.leafTop, prev);
    this.setText(this.leafBot, next);
    this.leafTop.style.visibility = "visible";
    this.leafBot.style.visibility = "visible";
    const ease = "cubic-bezier(.55,0,.9,.5)";
    await this.leafTop.animate([{ transform: "rotateX(0deg)" }, { transform: "rotateX(-90deg)" }], { duration: ms / 2, easing: ease, fill: "forwards" }).finished;
    this.leafTop.style.visibility = "hidden";
    await this.leafBot.animate([{ transform: "rotateX(90deg)" }, { transform: "rotateX(0deg)" }], { duration: ms / 2, easing: "cubic-bezier(.2,.6,.3,1.3)", fill: "forwards" }).finished;
    this.setText(this.bot, next);
    this.leafBot.style.visibility = "hidden";
    this.current = next;
  }

  /**
   * Flip through the character wheel until `target`, like a real board: always forward,
   * at most `maxSteps` intermediate characters so long words still land quickly.
   */
  to(target: string, { ms = 90, maxSteps = 7, delay = 0 } = {}) {
    const t = target.toUpperCase();
    this.busy = this.busy.then(async () => {
      if (delay) await new Promise((r) => setTimeout(r, delay));
      if (this.current === t) return;
      const wheel = FLAP_CHARS.includes(t) ? FLAP_CHARS : FLAP_CHARS + t;
      let i = wheel.indexOf(this.current);
      const end = wheel.indexOf(t);
      let steps = (end - i + wheel.length) % wheel.length;
      const skip = Math.max(0, steps - maxSteps);
      i = (i + skip) % wheel.length;
      steps -= skip;
      for (let k = 1; k <= steps; k++) await this.flipOnce(wheel[(i + k) % wheel.length], ms);
    });
    return this.busy;
  }

  /** Set without animating (reduced motion, initial render). */
  set(ch: string) {
    const c = ch.toUpperCase();
    [this.top, this.bot, this.leafTop, this.leafBot].forEach((h) => this.setText(h, c));
    this.current = c;
  }
}

/** A row of cells bound to a container. */
export class FlapRow {
  cells: FlapCell[] = [];
  constructor(container: HTMLElement, length: number, cellClass = "") {
    container.textContent = "";
    for (let i = 0; i < length; i++) {
      const c = new FlapCell(" ");
      if (cellClass) c.el.classList.add(cellClass);
      container.appendChild(c.el);
      this.cells.push(c);
    }
  }
  show(text: string, opts: { ms?: number; maxSteps?: number; stagger?: number; instant?: boolean } = {}) {
    const padded = text.toUpperCase().padEnd(this.cells.length, " ").slice(0, this.cells.length);
    return Promise.all(
      this.cells.map((c, i) => (opts.instant ? (c.set(padded[i]), Promise.resolve()) : c.to(padded[i], { ms: opts.ms, maxSteps: opts.maxSteps, delay: i * (opts.stagger ?? 40) }))),
    );
  }
}
