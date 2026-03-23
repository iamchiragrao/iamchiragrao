import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { IndianPortfolio } from "@/components/IndianPortfolio";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Marquee />
      <Portfolio />
      <IndianPortfolio />
      
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
          <div className="flex justify-center gap-4 sm:gap-8 mb-12 flex-wrap px-4">
            {[
              { name: "Instagram", url: "https://www.instagram.com/iamchiragrao" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/iamchiragrao" },
              { name: "Frame.io", url: "https://next.frame.io/share/151464ed-d786-4aaa-b666-9ab7adc212f7/446f2cbe-0dbb-40f2-aab8-c1925542c8f4" },
              { name: "Email", url: "mailto:hello@chiragrao.com" }
            ].map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent transition-colors">{item.name}</a>
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
