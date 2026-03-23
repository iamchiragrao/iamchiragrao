"use client";

import { motion } from "framer-motion";

const logos = [
  "Greylock", "Acquired", "My First Million", "A16z", "Sequoia", "Founders Fund", "Benchmark"
];

export function Marquee() {
  return (
    <div className="py-20 border-y border-foreground/5 overflow-hidden bg-foreground/2">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] font-bold text-foreground/30">
          Trusted by the best in the world
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-24 py-4">
          {[...logos, ...logos].map((logo, i) => (
            <span 
              key={i} 
              className="text-2xl md:text-4xl font-bold text-foreground/20 hover:text-accent transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
