"use client";

import { motion } from "framer-motion";

const indianProjects = [
  { videoId: "Finance_Branding_vahalz", text: "Chirag completely transformed our brand's visual identity. The edits were sharp, modern, and exactly what we needed to capture the Indian market." },
  { videoId: "Edit_timeline_tgc1a5", text: "An absolute professional. The pacing and storytelling in our promotional reels improved our engagement by over 300%." },
  { videoId: "Brand_style_b7ikmi", text: "We needed someone who understood the nuances of tech communication. Chirag nailed every single video snippet we asked for." },
  { videoId: "Concept_Explainer_kfml9n", text: "Flawless execution. The concept explainers were delivered perfectly on time and looked incredibly premium." },
];

export function IndianPortfolio() {
  return (
    <section id="indian-portfolio" className="py-24 bg-background overflow-hidden relative border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <p className="text-xs font-sans uppercase tracking-[0.3em] mb-4 text-accent font-bold">Client Success</p>
          <h2 className="serif text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Trusted by <span className="text-foreground/40 italic">Indian</span> Brands
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto font-medium">
            Partnering with top creators and businesses across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {indianProjects.map((client, i) => (
            <motion.div 
              key={client.videoId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-accent/30 transition-colors"
            >
              <div className="w-24 md:w-32 shrink-0 rounded-2xl overflow-hidden shadow-lg bg-black/50 aspect-[9/16]">
                <video
                  src={`https://res.cloudinary.com/dwop0otlb/video/upload/q_auto,f_auto/${client.videoId}.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <svg className="w-8 h-8 mb-4 text-accent/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
                </svg>
                <p className="text-foreground/80 italic text-sm md:text-base leading-relaxed">
                  "{client.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
