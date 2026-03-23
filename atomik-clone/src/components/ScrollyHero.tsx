"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEXT_SLIDES = [
  "Chirag Rao",
  "High-Impact Editing",
  "Visual Effects",
  "Content Analyzer",
];

export function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapInitialized = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Function that sets up GSAP once we know the video duration
    const initGSAP = () => {
      if (gsapInitialized.current) return;
      
      const duration = video.duration;
      if (!duration || !isFinite(duration) || duration <= 0) return;
      
      gsapInitialized.current = true;

      // Set initial text states via GSAP (visibility:hidden + opacity:0)
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { autoAlpha: 0, scale: 0.92, y: 30 });
      });

      // ── Master timeline scrubbed by scroll ───────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // 0.5s smoothing
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ── Text slide animations ─────────────────────────────────────────
      const slideCount = TEXT_SLIDES.length;
      const INITIAL_DELAY = 0.075; // Half the delay (7.5%) to make the first name appear 2x faster
      const usableTimeline = 1.0 - INITIAL_DELAY; // The remaining 92.5% of the scroll
      const sliceDuration = usableTimeline / slideCount; // Time allotted per slide

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = INITIAL_DELAY + i * sliceDuration;

        // Fade in
        tl.fromTo(
          el,
          { autoAlpha: 0, scale: 0.92, y: 30 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: sliceDuration * 0.2, // 20% of slice length to fade in
            ease: "power2.out",
          },
          start
        );

        // Fade out (skip for last slide)
        if (i < slideCount - 1) {
          tl.to(
            el,
            {
              autoAlpha: 0,
              scale: 1.08,
              y: -20,
              duration: sliceDuration * 0.2, // 20% of slice length to fade out
              ease: "power2.in",
            },
            start + sliceDuration * 0.8
          );
        }
      });

      // ── Video scrub (Length: 1 unit total) ──────────────────────────
      // The video starts scrubbing from 0 seconds (the beginning).
      // We use ease: "power3.out" to exponentially fast-forward the first part of the video 
      // over a very short scroll distance, accommodating the faster text arrival.
      const videoProxy = { time: 0 }; 
      tl.to(
        videoProxy,
        {
          time: duration, // Scrub all the way to the end of the video
          duration: 1, // Matches the master timeline length
          ease: "power3.out", 
          onUpdate: () => {
             // Update the actual video element whenever the proxy value changes
            if (video.readyState >= 2) {
                video.currentTime = videoProxy.time;
            }
          },
        },
        0 // Video tween starts at the absolute beginning of the master timeline (t=0)
      );

      // Force ScrollTrigger to recalculate after setup
      ScrollTrigger.refresh();
    };

    video.addEventListener("loadedmetadata", initGSAP);
    video.addEventListener("canplay", initGSAP);

    if (video.readyState >= 2) {
      initGSAP();
    }

    return () => {
      video.removeEventListener("loadedmetadata", initGSAP);
      video.removeEventListener("canplay", initGSAP);
      
      // Kill all ScrollTrigger instances for this container
      ScrollTrigger.getAll().forEach((st) => st.kill());

      gsapInitialized.current = false;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: "500vh" }}
    >
      {/* This inner div is what GSAP will pin */}
      <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        {/* Video background — explicit h-screen to avoid inheriting the 500vh trigger height */}
        <div className="absolute top-0 left-0 w-full h-screen">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/dwop0otlb/video/upload/v1774290696/cinematic_bg_rnkvlf.mp4"
            className="scrolly-video w-full h-screen object-cover opacity-60 dark:opacity-50"
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        {/* Text Overlays */}
        <div className="relative z-10 w-full h-full text-white mix-blend-difference">
          {TEXT_SLIDES.map((text, index) => (
            <div
              key={text}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className={`absolute inset-0 flex opacity-0 invisible ${
                index === 0 
                  ? "justify-center items-end pb-[20vh] text-center md:justify-start md:items-center md:pb-0 md:pl-24 md:text-left" 
                  : "justify-center items-end pb-[20vh] text-center md:items-center md:pb-0"
              }`}
            >
              <h1 className="text-5xl md:text-8xl serif font-bold tracking-tight text-white drop-shadow-2xl">
                {text}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
