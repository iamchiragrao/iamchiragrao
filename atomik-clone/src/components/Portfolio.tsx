"use client";

import { useState, useRef } from "react";
import { VideoStack } from "./VideoStack";

const videos = [
  { id: "The_Clip_Agency_kc4vew", title: "The Clip Agency", type: "horizontal" },
  { id: "collage_design_x8s6y2", title: "Collage Design", type: "horizontal" },
  { id: "Info_Typo_Branding_v6qhat", title: "Info Typo Branding", type: "horizontal" },
  { id: "Concept_Explainer_kfml9n", title: "Concept Explainer", type: "horizontal" },
  { id: "Edit_timeline_tgc1a5", title: "Edit Timeline", type: "horizontal" },
  { id: "Personal_Experiment_g0mwwu", title: "Personal Experiment", type: "vertical" },
  { id: "Finance_Branding_vahalz", title: "Finance Branding", type: "horizontal" },
  { id: "Brand_style_b7ikmi", title: "Brand Style", type: "vertical" },
  { id: "DESIGN_yd8d1v", title: "Design", type: "horizontal" },
  { id: "Collage_Animation_Explainer_i5hwct", title: "Collage Animation Explainer", type: "horizontal" },
  { id: "Complete_Branding_ticvgq", title: "Complete Branding", type: "horizontal" },
];

export function Portfolio() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Double the videos for infinite scroll illusion
  const doubledVideos = [...videos, ...videos];

  return (
    <section
      id="portfolio"
      className="py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,59,170,0.14) 0%, rgba(108,59,170,0.05) 40%, transparent 70%),
          linear-gradient(180deg, rgba(108,59,170,0.06) 0%, transparent 30%, transparent 70%, rgba(108,59,170,0.06) 100%)
        `,
      }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.3em] mb-4 text-accent font-bold">Portfolio</p>
          <h2 className="heading text-5xl md:text-7xl font-bold mb-6">
            Selected <span className="text-accent italic">Works</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
            A showcase of high-impact visual stories. Tap any to preview.
          </p>
        </div>
      </div>

      {/* Mobile Tilt Stack */}
      <div className="block md:hidden px-4">
        <VideoStack videos={videos} />
      </div>

      {/* Desktop: Auto-scrolling horizontal carousel */}
      <div
        className="hidden md:block relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(true);
          // Resume after a short delay so it feels intentional
          setTimeout(() => {
            setIsPaused(false);
            setSelectedIndex(null);
          }, 300);
        }}
      >
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }} />

        {/* Carousel track */}
        <div
          ref={carouselRef}
          className={`flex gap-6 px-8 portfolio-carousel ${isPaused ? "paused" : ""}`}
          style={{ width: "max-content" }}
        >
          {doubledVideos.map((v, i) => {
            const isSelected = selectedIndex === i;
            return (
              <div
                key={`${v.id}-${i}`}
                className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500"
                style={{
                  width: isSelected ? 400 : 220,
                  height: isSelected ? 460 : 380,
                  boxShadow: isSelected
                    ? "0 0 40px 8px rgba(108, 59, 170, 0.3), 0 20px 60px -10px rgba(0,0,0,0.5)"
                    : "0 8px 32px -8px rgba(0,0,0,0.4)",
                }}
                onClick={() => setSelectedIndex(isSelected ? null : i)}
              >
                {/* Purple gradient behind video */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(145deg, rgba(108,59,170,0.25) 0%, rgba(90,47,145,0.1) 50%, rgba(0,0,0,0.8) 100%)`,
                  }}
                />

                <video
                  src={`https://res.cloudinary.com/dwop0otlb/video/upload/q_auto,f_auto/${v.id}.mp4`}
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
                <div className="absolute bottom-4 left-4 right-4 z-[3]">
                  <p className="text-white font-bold text-sm tracking-wide">{v.title}</p>
                  {isSelected && (
                    <p className="text-white/50 text-xs mt-1 font-mono uppercase tracking-widest">
                      Playing • Tap to close
                    </p>
                  )}
                </div>

                {/* Selection ring */}
                {isSelected && (
                  <div
                    className="absolute inset-0 z-[4] rounded-2xl pointer-events-none"
                    style={{
                      border: "2px solid rgba(108, 59, 170, 0.6)",
                      boxShadow: "inset 0 0 20px rgba(108, 59, 170, 0.15)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
