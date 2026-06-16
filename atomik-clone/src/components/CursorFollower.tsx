"use client";

import { useEffect, useRef } from "react";

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      cursor.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      rafId.current = requestAnimationFrame(animate);
    };

    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
      return;
    }

    window.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#6c3baa",
        boxShadow:
          "0 0 6px 2px rgba(108, 59, 170, 0.7), " +
          "0 0 14px 5px rgba(108, 59, 170, 0.4), " +
          "0 0 28px 10px rgba(108, 59, 170, 0.15)",
        willChange: "transform",
      }}
    />
  );
}
