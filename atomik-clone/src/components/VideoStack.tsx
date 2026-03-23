"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: string;
  title: string;
  type: string;
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
    <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
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
          const xOffset = offset * 60; // Spread them horizontally
          const zOffset = Math.abs(offset) * -100; // Push non-current items back
          const rotateY = offset * -25; // Tilt them towards the center (like Samsung Task Changer)
          const scale = isCurrent ? 1 : 0.85;

          return (
            <motion.div
              key={v.id}
              className="absolute top-1/2 left-1/2 rounded-3xl overflow-hidden shadow-2xl bg-black w-[260px] h-[460px] cursor-pointer border border-white/10"
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
              <video
                src={`https://res.cloudinary.com/dwop0otlb/video/upload/q_auto,f_auto/${v.id}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-3xl"
              />
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
