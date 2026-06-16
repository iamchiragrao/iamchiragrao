"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress((scrollTop / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #8e5feb 0%, #b388ff 50%, #8e5feb 100%)",
          boxShadow: "0 0 8px rgba(142, 95, 235, 0.5)",
        }}
      />
    </div>
  );
}
