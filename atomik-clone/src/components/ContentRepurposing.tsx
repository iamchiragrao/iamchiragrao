"use client";

import { useState } from "react";

const repurposingVideos = [
  {
    id: "intro-hook",
    title: "Intro Hook",
    src: "https://res.cloudinary.com/dwop0otlb/video/upload/v1782915873/Intro_hook_h_yupfom.mp4",
  },
  {
    id: "horizontal-1",
    title: "Horizontal Edit",
    src: "https://res.cloudinary.com/dwop0otlb/video/upload/v1782915900/Horizontal_xlufrd.mp4",
  },
  {
    id: "strong-clip",
    title: "Strong Clip",
    src: "https://res.cloudinary.com/dwop0otlb/video/upload/v1782915899/storng_clip_jk0yuy.mp4",
  },
  {
    id: "ig-video",
    title: "IG Video",
    src: "https://res.cloudinary.com/dwop0otlb/video/upload/v1782905309/ig_video_4_ozzkia.mp4",
  },
  {
    id: "horizontal-3",
    title: "Horizontal 3",
    src: "https://res.cloudinary.com/dwop0otlb/video/upload/v1782915934/horizontal_3_idc5uq.mp4",
  },
  {
    id: "strong-clip-h",
    title: "Strong Clip H",
    src: "https://res.cloudinary.com/dwop0otlb/video/upload/v1782915930/strong_clip_h_j24sau.mp4",
  },
];

export function ContentRepurposing() {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the videos for seamless infinite scroll
  const tripleVideos = [...repurposingVideos, ...repurposingVideos, ...repurposingVideos];

  return (
    <section
      id="content-repurposing"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden border-t border-foreground/10"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,59,170,0.10) 0%, rgba(108,59,170,0.04) 40%, transparent 70%),
          linear-gradient(180deg, rgba(108,59,170,0.04) 0%, transparent 30%, transparent 70%, rgba(108,59,170,0.04) 100%)
        `,
      }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] mb-3 sm:mb-4 text-accent font-bold">
            Repurposed
          </p>
          <h2 className="heading text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
            Content <span className="text-accent italic">Repurposing</span>
          </h2>
          <p className="text-foreground/50 text-sm sm:text-lg max-w-2xl mx-auto px-4">
            One shoot, multiple formats. Maximizing reach across every platform.
          </p>
        </div>
      </div>

      {/* Auto-scrolling horizontal carousel — REVERSE direction */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(true);
          setTimeout(() => setIsPaused(false), 300);
        }}
      >
        {/* Edge fade gradients */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #ffffff 0%, transparent 100%)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #ffffff 0%, transparent 100%)" }}
        />

        {/* Carousel track — reverse direction */}
        <div
          className={`flex gap-4 sm:gap-6 px-4 sm:px-8 repurposing-carousel ${isPaused ? "paused" : ""}`}
          style={{ width: "max-content" }}
        >
          {tripleVideos.map((v, i) => (
            <div
              key={`${v.id}-${i}`}
              className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500"
              style={{
                width: "clamp(280px, 30vw, 420px)",
                height: "clamp(160px, 18vw, 240px)",
                boxShadow: "0 8px 32px -8px rgba(0,0,0,0.4)",
              }}
            >
              {/* Purple gradient behind video */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `linear-gradient(145deg, rgba(108,59,170,0.25) 0%, rgba(90,47,145,0.1) 50%, rgba(0,0,0,0.8) 100%)`,
                }}
              />

              <video
                src={v.src}
                autoPlay
                loop
                muted
                playsInline
                className="relative z-[1] w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Bottom gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 z-[2]"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}
              />

              {/* Title label */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-[3]">
                <p className="text-white font-bold text-xs sm:text-sm tracking-wide">{v.title}</p>
              </div>

              {/* Hover ring */}
              <div
                className="absolute inset-0 z-[4] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  border: "2px solid rgba(108, 59, 170, 0.5)",
                  boxShadow: "inset 0 0 20px rgba(108, 59, 170, 0.1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
