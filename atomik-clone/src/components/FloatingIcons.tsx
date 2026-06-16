"use client";

import { useEffect, useRef } from "react";

const ICONS = [
  // Scissors
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`, x: 8, y: 15, size: 28, speed: 18, drift: 12 },
  // Film strip
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>`, x: 85, y: 25, size: 26, speed: 22, drift: 10 },
  // Play circle
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`, x: 92, y: 65, size: 24, speed: 15, drift: 14 },
  // Sliders / mixer
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`, x: 5, y: 70, size: 22, speed: 20, drift: 8 },
  // Pen tool
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`, x: 50, y: 85, size: 20, speed: 25, drift: 16 },
  // Layers
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`, x: 75, y: 80, size: 24, speed: 17, drift: 11 },
  // Wand / magic
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8L19 13"/><path d="M15 9h0"/><path d="M17.8 6.2L19 5"/><path d="M11 6.2L9.7 5"/><path d="M11 11.8L9.7 13"/><line x1="2" y1="22" x2="13" y2="11"/></svg>`, x: 30, y: 40, size: 22, speed: 14, drift: 13 },
  // Zap
  { svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`, x: 65, y: 10, size: 20, speed: 19, drift: 15 },
];

export function FloatingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    const startTime = performance.now();

    let rafId: number;

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const speed = ICONS[i].speed;
        const drift = ICONS[i].drift;

        const yOffset = Math.sin(elapsed / speed * Math.PI * 2) * drift;
        const xOffset = Math.cos(elapsed / (speed * 1.3) * Math.PI * 2) * (drift * 0.5);
        const rotate = Math.sin(elapsed / (speed * 0.8) * Math.PI * 2) * 15;

        el.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotate}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {ICONS.map((icon, i) => (
        <div
          key={i}
          className="absolute text-accent/[0.07] will-change-transform"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: icon.size,
            height: icon.size,
          }}
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      ))}
    </div>
  );
}
