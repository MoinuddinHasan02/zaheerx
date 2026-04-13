"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#institutions", label: "Institutions" },
  { href: "#realestate", label: "Real Estate" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#0f4c3a] flex items-center justify-center text-white font-outfit font-bold text-lg">
              Z
            </div>
            <span className="font-outfit font-semibold text-[#0f4c3a] text-lg hidden sm:block">
              Zaheeruddin
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-700 hover:text-[#0f4c3a] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-xs border border-[#0f4c3a] rounded-full px-2 py-1">
              <Globe size={12} className="text-[#0f4c3a]" />
              <a
                href="/en"
                className={`px-1 ${locale === "en" ? "text-[#0f4c3a] font-semibold" : "text-slate-500"}`}
              >
                EN
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="/ur"
                className={`px-1 ${locale === "ur" ? "text-[#0f4c3a] font-semibold" : "text-slate-500"}`}
              >
                اردو
              </a>
            </div>

            {/* Admin link */}
            <a
              href="/admin"
              className="hidden md:block text-xs bg-[#0f4c3a] text-white px-3 py-1.5 rounded-full hover:bg-[#166b52] transition-colors"
            >
              Admin
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-700"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-[#0f4c3a] py-2 border-b border-slate-50"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/admin"
              className="text-sm bg-[#0f4c3a] text-white px-3 py-2 rounded-lg text-center mt-2"
            >
              Admin Panel
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
