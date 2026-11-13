import type { ReactNode } from "react";

type Kind = "iphone" | "ipad" | "macbook";

/**
 * CSS device frames: an iPhone with a dynamic island, an iPad with a thin bezel, a MacBook
 * with a notch and base. Pass the screenshot as the child image; the frame scales with width.
 */
export default function Device({ kind, src, alt = "", className = "", children, priority = false }: { kind: Kind; src?: string; alt?: string; className?: string; children?: ReactNode; priority?: boolean }) {
  const screen = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} draggable={false} />
  ) : (
    children
  );
  if (kind === "macbook") {
    return (
      <div className={`dev dev-mac ${className}`}>
        <div className="frame">
          <div className="mac-lid">
            <i className="mac-notch" aria-hidden />
            <div className="screen">{screen}</div>
          </div>
          <div className="mac-base" aria-hidden><i /></div>
        </div>
      </div>
    );
  }
  if (kind === "ipad") {
    return (
      <div className={`dev dev-ipad ${className}`}>
        <div className="frame">
          <i className="cam" aria-hidden />
          <div className="screen">{screen}</div>
        </div>
      </div>
    );
  }
  return (
    <div className={`dev dev-iphone ${className}`}>
      <div className="frame">
        <i className="btn-l1" aria-hidden /><i className="btn-l2" aria-hidden /><i className="btn-l3" aria-hidden /><i className="btn-r" aria-hidden />
        <div className="screen">
          {screen}
          <i className="island" aria-hidden />
        </div>
      </div>
    </div>
  );
}
