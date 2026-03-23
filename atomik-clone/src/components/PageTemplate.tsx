"use client";

import { Header } from "@/components/Header";
import { motion } from "framer-motion";

interface PageTemplateProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function PageTemplate({ title, subtitle, children }: PageTemplateProps) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="serif text-5xl md:text-7xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>
      </section>
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-32">
        {children || (
          <div className="py-20 text-center border border-dashed border-foreground/10 rounded-3xl">
            <p className="text-foreground/30 italic">Detailed content for this section is coming soon.</p>
          </div>
        )}
      </div>
      <footer className="py-12 border-t border-foreground/10 text-center text-foreground/40 text-sm italic">
        <p>&copy; {new Date().getFullYear()} Atomik Growth. All rights reserved.</p>
      </footer>
    </main>
  );
}
