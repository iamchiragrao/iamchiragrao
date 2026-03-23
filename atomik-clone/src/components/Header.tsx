"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Launch Virality", href: "/services/launch-virality" },
  { name: "Podcasting", href: "/services/podcasting" },
  { name: "Clipping", href: "/services/clipping" },
];

export function Header() {
  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 glass transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="shrink-0 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <svg 
                className="w-10 h-10 animate-spin-slow text-accent" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
                <circle cx="50" cy="50" r="20" fill="currentColor"/>
              </svg>
              <span className="serif text-2xl font-bold tracking-tight">Atomik</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
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
            <Link href="/case-studies" className="text-sm font-medium hover:text-accent transition-colors">Case Studies</Link>
            <Link href="/blog" className="text-sm font-medium hover:text-accent transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/contact" 
              className="hidden sm:block bg-accent text-background px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform"
            >
              Book A Call
            </Link>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-t border-foreground/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
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
              <Link href="/case-studies" className="block px-2 py-2 text-lg font-medium">Case Studies</Link>
              <Link href="/blog" className="block px-2 py-2 text-lg font-medium">Blog</Link>
              <Link href="/contact" className="block px-2 py-2 text-lg font-medium">Contact</Link>
              <Link 
                href="/contact" 
                className="block w-full text-center bg-accent text-background px-6 py-4 rounded-xl text-lg font-bold"
              >
                Book A Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
