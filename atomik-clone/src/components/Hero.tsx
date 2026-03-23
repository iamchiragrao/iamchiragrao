"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8">
            Engineering <br /><span className="text-foreground/40 italic">Visual</span> Engagement
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 leading-relaxed mb-12">
            The modern engine for high-impact video content. I partner with world-class creators and brands to dominate attention and drive growth through exceptional editing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#portfolio" className="w-full sm:w-auto bg-accent text-background px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform flex justify-center">
              View Portfolio
            </a>
            <a href="#contact" className="w-full sm:w-auto border border-foreground/10 px-8 py-4 rounded-full text-lg font-bold hover:bg-foreground/5 transition-colors flex justify-center">
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full max-w-4xl h-96 opacity-20 blur-3xl bg-accent/20 rounded-full" />
    </section>
  );
}
