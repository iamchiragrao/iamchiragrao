"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Video } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Long-Form Video", href: "#portfolio" },
  { name: "Short-Form / Reels", href: "#portfolio" },
  { name: "Motion Graphics", href: "#portfolio" },
];

export function Header() {
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-8 px-8 md:px-12 flex justify-between items-center transition-all duration-300 pointer-events-none">
        <div className="shrink-0 flex items-center gap-4 pointer-events-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center bg-accent/20 rounded-full text-accent">
              <Video className="w-4 h-4 animate-pulse" />
            </div>
            <span className="serif text-2xl font-bold tracking-tight text-foreground">Chirag Rao</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6 items-center bg-foreground/5 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-foreground/10 transition-all duration-500 pointer-events-auto">
          <div 
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 py-2 text-sm font-medium hover:text-accent transition-colors">
              Services <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-0 w-56 bg-background border border-foreground/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl"
                >
                  <div className="py-2">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="w-px h-3 bg-foreground/20"></span>
          <Link href="#portfolio" className="text-sm font-medium hover:text-accent transition-colors">Portfolio</Link>
          <span className="w-px h-3 bg-foreground/20"></span>
          <Link href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</Link>
          <span className="w-px h-3 bg-foreground/20"></span>
          <Link href="#contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-4 pointer-events-auto">
          <ThemeToggle />
          <Link 
            href="#contact" 
            className="hidden sm:block bg-accent text-background px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform"
          >
            Hire Me
          </Link>
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed inset-x-0 top-24 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b border-foreground/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold px-2">Services</p>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-2 py-2 text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href="#portfolio" className="block px-2 py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
              <Link href="#about" className="block px-2 py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link href="#contact" className="block px-2 py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link 
                href="#contact" 
                className="block w-full text-center bg-accent text-background px-6 py-4 rounded-xl text-lg font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
