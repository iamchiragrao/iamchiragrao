import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Marquee />
      <Portfolio />
      
      {/* Services Preview Section */}
      <section id="about" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Long-Form Video", desc: "Engaging and structured edits for documentaries, YouTube videos, and courses." },
            { title: "Short-Form / Reels", desc: "High-retention, fast-paced clips optimized for TikTok, Reels, and Shorts." },
            { title: "Motion Graphics", desc: "Custom animations, kinetic typography, and visual effects to elevate your brand." },
          ].map((service) => (
            <div key={service.title} className="p-8 rounded-3xl border border-foreground/10 hover:border-accent transition-colors group cursor-default">
              <h3 className="serif text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-auto py-20 border-t border-foreground/5 bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="serif text-3xl font-bold mb-8">Chirag Rao</div>
          <p className="text-foreground/40 text-sm mb-8 italic">Professional Video Editor</p>
          <div className="flex justify-center gap-8 mb-12">
            {["Email", "LinkedIn", "Frame.io", "Twitter"].map((item) => (
              <a key={item} href="#" className="text-sm font-medium hover:text-accent transition-colors">{item}</a>
            ))}
          </div>
          <p className="text-foreground/20 text-xs uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Chirag Rao. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
