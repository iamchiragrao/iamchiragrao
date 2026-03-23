import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Marquee />
      
      {/* Services Preview Section */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Launch Virality", desc: "Systematic frameworks to launch your brand or podcast into the cultural zeitgeist." },
            { title: "Podcasting", desc: "End-to-end production for the world's most influential shows." },
            { title: "Clipping", desc: "High-performance short-form content designed to capture attention at scale." },
          ].map((service) => (
            <div key={service.title} className="p-8 rounded-3xl border border-foreground/10 hover:border-accent transition-colors group cursor-default">
              <h3 className="serif text-3xl font-bold mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-20 border-t border-foreground/5 bg-foreground/2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="serif text-3xl font-bold mb-8">Atomik</div>
          <p className="text-foreground/40 text-sm mb-8 italic">Defining New Media</p>
          <div className="flex justify-center gap-8 mb-12">
            {["Services", "Case Studies", "Blog", "Contact"].map((item) => (
              <a key={item} href="#" className="text-sm font-medium hover:text-accent transition-colors">{item}</a>
            ))}
          </div>
          <p className="text-foreground/20 text-xs uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} Atomik Growth. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
