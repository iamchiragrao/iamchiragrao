import { Header } from "@/components/Header";
import { Marquee } from "@/components/Marquee";
import { Portfolio } from "@/components/Portfolio";
import { ContentRepurposing } from "@/components/ContentRepurposing";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col relative bg-background z-10">
        <Header />
        <Marquee />
        <Portfolio />
        <ContentRepurposing />
      
      {/* Services Preview Section */}
      <section id="about" className="py-16 sm:py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[
            { title: "Long-Form Video", desc: "Engaging and structured edits for documentaries, YouTube videos, and courses." },
            { title: "Short-Form / Reels", desc: "High-retention, fast-paced clips optimized for TikTok, Reels, and Shorts." },
            { title: "Motion Graphics", desc: "Custom animations, kinetic typography, and visual effects to elevate your brand." },
          ].map((service) => (
            <div key={service.title} className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-foreground/10 hover:border-accent transition-colors group cursor-default">
              <h3 className="heading text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed font-medium text-sm sm:text-base">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-auto py-12 sm:py-16 md:py-20 border-t border-foreground/5 bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="heading text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Chirag Rao</div>
          <p className="text-foreground/40 text-xs sm:text-sm mb-6 sm:mb-8 italic">Motion Designer/ Video editor</p>
          <div className="flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-12 flex-wrap px-4">
            {[
              { name: "Instagram", url: "https://www.instagram.com/iamchiragrao" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/iamchiragrao" },
              { name: "Frame.io", url: "https://next.frame.io/share/151464ed-d786-4aaa-b666-9ab7adc212f7/446f2cbe-0dbb-40f2-aab8-c1925542c8f4" },
              { name: "Email", url: "mailto:hello@chiragrao.com" }
            ].map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium hover:text-accent transition-colors">{item.name}</a>
            ))}
          </div>
          <p className="text-foreground/20 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Chirag Rao. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}

