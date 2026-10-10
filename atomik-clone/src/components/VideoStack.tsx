"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CDN_BASE = "https://cdn.jsdelivr.net/gh/iamchiragrao/my-assets@main/assets";

interface Video {
  id: string;
  title: string;
  type: string;
  file?: string;
  url?: string;
}

interface VideoStackProps {
  videos: Video[];
}

export function VideoStack({ videos }: VideoStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [videos.length]);

  return (
    <div className="relative h-[420px] sm:h-[520px] w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
      <AnimatePresence mode="popLayout">
        {videos.map((v, i) => {
          // Calculate relative position to current index
          // Handling wrap-around for infinite feeling (optional, but let's do a simple bounded for now)
          let offset = i - currentIndex;
          
          // To make it wrap seamlessly in a small array:
          if (offset < -2) offset += videos.length;
          if (offset > 2) offset -= videos.length;

          // Only render items close to current to save DOM/Video processing
          if (Math.abs(offset) > 2) return null;

          const isCurrent = offset === 0;
          
          // Stacking calculations
          const xOffset = offset * 50; // Spread them horizontally
          const zOffset = Math.abs(offset) * -100; // Push non-current items back
          const rotateY = offset * -25; // Tilt them towards the center
          const scale = isCurrent ? 1 : 0.85;

          return (
            <motion.div
              key={v.id}
              className="absolute top-1/2 left-1/2 rounded-3xl overflow-hidden shadow-2xl bg-black w-[200px] h-[360px] sm:w-[260px] sm:h-[460px] cursor-pointer border border-white/10"
              initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.5 }}
              animate={{ 
                opacity: Math.abs(offset) > 1 ? 0.3 : 1,
                x: `calc(-50% + ${xOffset}px)`, 
                y: "-50%",
                z: zOffset,
                rotateY: rotateY,
                scale: scale,
                zIndex: 10 - Math.abs(offset)
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={() => setCurrentIndex(i)}
            >
              {(v.url || v.file) ? (
                <video
                  src={v.url || (v.file?.startsWith("http") ? v.file : `${CDN_BASE}/${v.file}`)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950 border border-dashed border-purple-500/25 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
                    <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-purple-300 font-semibold mb-1">Unlinked Slot</span>
                </div>
              )}
              {isCurrent && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full z-10 whitespace-nowrap"
                >
                  <p className="text-white font-bold text-sm">{v.title}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
