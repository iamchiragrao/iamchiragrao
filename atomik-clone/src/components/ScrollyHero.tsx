"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEXT_SLIDES = [
  "I am\nChirag Rao",
  "I craft\nhigh-impact edits",
  "I engineer\nvisual effects",
  "I decode\nmetrics",
];

export function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapInitialized = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!video || !container || !inner) return;

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
          trigger: inner,
          start: "top top",
          end: "+=200%", // The section will pin for 200vh of scrolling
          scrub: 0.5,    // 0.5s smoothing
          pin: true,
          pinSpacing: true, // Crucial: pushes the next section down, effectively revealing it naturally after
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            if (video && video.readyState >= 2) {
              video.playbackRate = 2.5; // Speed up the end video part
              video.play();
            }
          },
          onEnterBack: () => {
            if (video) {
              video.pause();
              video.playbackRate = 1.0; // Reset just in case
            }
          }
        },
      });

      // ── Text slide animations ─────────────────────────────────────────
      const slideCount = TEXT_SLIDES.length;

      // We dedicate the first 33% of the scroll exclusively to scrubbing the video up to 5s.
      // During this time, no text overlays are visible yet.
      const videoScrubScrollDuration = 0.33;

      const usableTimeline = 1.0 - videoScrubScrollDuration;
      // Calculate slices so that the final text's fade-in sequence ends exactly at 1.0 (100% of pinning timeline).
      // Slide 0, 1, 2 take 1 slice each. Slide 3 takes 0.2 slices (fade-in only).
      const sliceDuration = usableTimeline / (slideCount - 1 + 0.2);

      // ── Video scrub to 5 seconds ──────────────────────────
      const videoProxy = { time: 0 };
      const fastForwardDuration = Math.min(2, duration);
      const fastForwardScroll = 0.05; // Force first 2 seconds to fly by in the first 5% of scroll
      const pauseTime = Math.min(5, duration);

      // Tween 1: First 2 seconds fast-forward
      tl.to(
        videoProxy,
        {
          time: fastForwardDuration,
          duration: fastForwardScroll,
          ease: "power2.inOut",
          onUpdate: () => {
            if (video.readyState >= 2) {
              video.currentTime = videoProxy.time;
            }
          },
        },
        0
      );

      // Tween 2: Remaining video up to 5th second over the rest of the dedicated scrub time
      if (pauseTime > fastForwardDuration) {
        tl.to(
          videoProxy,
          {
            time: pauseTime,
            // duration is the remainder of the 33% timeframe
            duration: videoScrubScrollDuration - fastForwardScroll,
            ease: "none",
            onUpdate: () => {
              if (video.readyState >= 2) {
                video.currentTime = videoProxy.time;
              }
            },
          },
          fastForwardScroll
        );
      }

      // ── Text slide animations ─────────────────────────────────────────
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        // Texts start appearing AFTER the video scrub timeframe
        const start = videoScrubScrollDuration + i * sliceDuration;

        // Fade in (land with a bang)
        tl.fromTo(
          el,
          { autoAlpha: 0, scale: 2.5, y: 50 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: sliceDuration * 0.2, // exactly 20% of a full slice
            ease: "back.out(2)",
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
              duration: sliceDuration * 0.2, // exactly 20% of a full slice
              ease: "power2.in",
            },
            start + sliceDuration * 0.8
          );
        }
      });



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
    >
      {/* This inner div is what GSAP will pin. The pin-spacer handles the padding. */}
      <div
        ref={innerRef}
        className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Video background */}
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
              className="absolute inset-0 flex opacity-0 invisible justify-center items-end pb-[20vh] text-center md:justify-start md:items-center md:pb-0 md:pl-24 md:text-left"
            >
              <h1 className="text-5xl md:text-8xl serif font-bold tracking-tight text-white drop-shadow-2xl whitespace-pre-line leading-tight">
                {text}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
