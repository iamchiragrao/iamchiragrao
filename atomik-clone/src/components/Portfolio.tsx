"use client";



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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {videos.map((v, i) => {
            const isVertical = v.type === "vertical";
            return (
              <div 
                key={i} 
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-foreground/5 shadow-2xl ${
                  isVertical ? "aspect-[9/16] md:row-span-2" : "aspect-video md:col-span-2 lg:col-span-1 lg:row-span-1"
                }`}
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
