"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center pb-24 md:pb-0 md:justify-start md:pt-44 2xl:justify-center 2xl:pt-0 px-4 text-center overflow-hidden">
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-50 bg-accent/5 transition-opacity duration-500" />
      
      {/* The Moving Wheel Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.2, perspective: "1000px", perspectiveOrigin: "center center", cursor: "grab", pointerEvents: "auto" }}>
        <div style={{ transform: "rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)", transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}>
          <svg width="900" height="900" viewBox="0 0 100 100" className="text-accent animate-spin-slow">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 2"></circle>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.1"></circle>
            <path d="M50 50 L50 2 M50 50 L98 50 M50 50 L50 98 M50 50 L2 50" stroke="currentColor" strokeWidth="0.1"></path>
            <path d="M50 50 L84 16 M50 50 L84 84 M50 50 L16 84 M50 50 L16 16" stroke="currentColor" strokeWidth="0.1" opacity="0.5"></path>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl space-y-10 text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-9xl leading-[1.2] text-foreground serif font-normal">
            Engineering <br/>
            <em className="serif italic inline-block text-accent" style={{ transform: "skewX(-3deg)" }}>
              Visual Engagement
            </em>
          </h1>
          <p className="text-sm md:text-lg mx-auto leading-relaxed px-4 md:px-0 md:whitespace-nowrap text-foreground/60 mt-8 mb-12">
            The editing arm for world-class creators & brands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#portfolio" className="bg-accent text-background px-8 py-3.5 rounded-full text-base font-bold hover:scale-105 transition-transform">
              View Portfolio
            </a>
            <a href="#contact" className="border border-foreground/20 px-8 py-3.5 rounded-full text-base font-medium hover:bg-foreground/5 transition-colors">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-b from-transparent to-background" />
    </header>
  );
}
