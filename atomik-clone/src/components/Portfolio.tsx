"use client";

import { VideoStack } from "./VideoStack";

const videos = [
  { id: "Concept_Explainer_kfml9n", title: "Concept Explainer", type: "horizontal" },
  { id: "Edit_timeline_tgc1a5", title: "Edit Timeline", type: "horizontal" },
  { id: "Personal_Experiment_g0mwwu", title: "Personal Experiment", type: "vertical" },
  { id: "Finance_Branding_vahalz", title: "Finance Branding", type: "horizontal" },
  { id: "Brand_style_b7ikmi", title: "Brand Style", type: "vertical" },
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
        
        {/* Mobile Tilt Stack */}
        <div className="block md:hidden mt-10">
          <VideoStack videos={videos} />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-6 p-4 mt-8">
          {videos.map((v, i) => {
            return (
              <div 
                key={i} 
                className="group relative rounded-3xl overflow-hidden cursor-pointer bg-foreground/5 shadow-2xl aspect-[9/16]"
              >
                <video
                  src={`https://res.cloudinary.com/dwop0otlb/video/upload/q_auto,f_auto/${v.id}.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none z-10">
                  <p className="text-white font-bold text-sm">{v.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
