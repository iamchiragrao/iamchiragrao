"use client";

const skills = [
  "High-Impact Editing",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
  "Visual Effects",
  "Audio Mixing",
  "Seamless Transitions",
  "Storytelling",
];

export function Marquee() {
  return (
    <div className="py-20 border-y border-foreground/5 overflow-hidden bg-foreground/2">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] font-bold text-foreground/30">
          Core Competencies
        </p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-24 py-4 items-center">
          {[...skills, ...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-24">
              <span className="serif text-4xl font-bold text-foreground/40 italic">{skill}</span>
              <span className="text-accent text-2xl font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
