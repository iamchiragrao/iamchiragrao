"use client";

import { motion } from "framer-motion";
import { ArrowRight, Video } from "lucide-react";

export function OutroCTA() {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white p-8 sm:p-16 md:p-20 text-center shadow-2xl border border-white/10"
      >
        {/* Background ambient lighting & grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 20%, rgba(108, 59, 170, 0.45) 0%, rgba(108, 59, 170, 0.1) 50%, transparent 80%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 198, 0.15) 0%, transparent 50%)
            `,
          }}
        />

        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Glowing Icon Badge */}
          <div className="mb-6 sm:mb-8 inline-flex items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-accent to-accent-hover text-white shadow-lg shadow-accent/40 border border-white/20">
            <Video className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          {/* Heading */}
          <h2 className="heading text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 sm:mb-10 text-white leading-tight">
            Book an intro call <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-accent-light">
              to work with us
            </span>
          </h2>

          {/* Call to Action Button */}
          <a
            href="mailto:hello@chiragrao.com"
            className="inline-flex items-center gap-2 bg-white text-neutral-950 hover:bg-neutral-100 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Book a call</span>
            <ArrowRight className="w-4 h-4 text-neutral-950 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
