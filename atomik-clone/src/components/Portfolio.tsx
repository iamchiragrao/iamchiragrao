"use client";

import { CldVideoPlayer } from "next-cloudinary";

const videos = [
  { id: "Concept_Explainer_kfml9n", title: "Concept Explainer" },
  { id: "Edit_timeline_tgc1a5", title: "Edit Timeline" },
  { id: "Personal_Experiment_g0mwwu", title: "Personal Experiment" },
  { id: "Finance_Branding_vahalz", title: "Finance Branding" },
  { id: "Brand_style_b7ikmi", title: "Brand Style Focus" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-foreground/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="serif text-5xl md:text-6xl font-bold mb-6">Selected <span className="text-accent italic">Works</span></h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto font-medium">
            A showcase of my recent video editing projects. High-impact visuals tailored for optimal engagement.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {videos.map((v, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden cursor-pointer bg-foreground/5 shadow-2xl aspect-video">
              <CldVideoPlayer
                width="1920"
                height="1080"
                src={v.id}
                colors={{
                  accent: "#d4b46e",
                  base: "#050505",
                  text: "#e5e5e0"
                }}
                fontFace="DM Sans"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none">
                <p className="text-white font-bold text-sm">{v.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
