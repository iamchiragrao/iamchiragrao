"use client";

import { motion } from "framer-motion";

const testimonials = [
  { text: "Chirag completely transformed our brand's visual identity. The edits were sharp, modern, and exactly what we needed." },
  { text: "An absolute professional edit. The pacing and storytelling in this reel improved our engagement by over 300%." },
  { text: "We needed someone who understood the nuances of tech and finance communication. Chirag nailed every video snippet we asked for." },
  { text: "Flawless execution. The concept explainers were delivered perfectly and looked premium." },
];

export function IndianPortfolio() {
  return (
    <section id="indian-portfolio" className="py-16 sm:py-20 md:py-24 overflow-hidden relative border-t border-foreground/10" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(108,59,170,0.04) 30%, rgba(108,59,170,0.04) 70%, transparent 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] mb-3 sm:mb-4 text-accent font-bold">Client Success</p>
          <h2 className="heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground">
            Trusted <span className="text-accent italic">across the country</span>
          </h2>
          <p className="text-foreground/60 text-sm sm:text-lg max-w-2xl mx-auto font-medium px-4">
            Partnering with top creators and businesses across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-surface-1 border border-foreground/10 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <svg className="w-8 h-8 sm:w-10 sm:h-10 mb-4 sm:mb-6 text-accent group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                </svg>
                <p className="text-foreground/90 italic text-base sm:text-lg md:text-xl leading-relaxed font-serif">
                  &quot;{client.text}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
