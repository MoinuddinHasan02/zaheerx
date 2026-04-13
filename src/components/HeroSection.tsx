"use client";

import { motion } from "framer-motion";
import { ChevronDown, Award, Building2, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#f2f7f5] via-white to-[#e8f3ee] overflow-hidden"
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#0f4c3a]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#0f4c3a]/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#0f4c3a]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#0f4c3a]/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#0f4c3a]/10 text-[#0f4c3a] text-xs font-semibold px-4 py-2 rounded-full mb-6"
            >
              <MapPin size={12} />
              Gulbarga (Kalaburagi), Karnataka, India
            </motion.div>

            <h1 className="font-outfit font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
              Mohammed{" "}
              <span className="text-[#0f4c3a] relative">
                Zaheeruddin
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="4"
                  viewBox="0 0 200 4"
                >
                  <path
                    d="M0,2 Q50,0 100,2 Q150,4 200,2"
                    stroke="#0f4c3a"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>{" "}
              <span className="text-slate-400 text-3xl">(Tipu)</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
              A visionary leader driving excellence in education and real estate
              in Gulbarga. Founder of multiple esteemed institutions, and
              developer of premium residential projects shaping the city's future.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mb-10">
              {[
                { value: "6+", label: "Institutions", icon: Building2 },
                { value: "25+", label: "Years Experience", icon: Award },
                { value: "1000+", label: "Students Guided", icon: Award },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f4c3a]/10 flex items-center justify-center">
                    <stat.icon size={18} className="text-[#0f4c3a]" />
                  </div>
                  <div>
                    <div className="font-outfit font-bold text-xl text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#institutions"
                className="inline-flex items-center gap-2 bg-[#0f4c3a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#166b52] transition-all hover:shadow-lg hover:shadow-[#0f4c3a]/25 active:scale-95"
              >
                View Institutions
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-[#0f4c3a] text-[#0f4c3a] px-6 py-3 rounded-full font-semibold hover:bg-[#0f4c3a]/5 transition-all active:scale-95"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* Visual Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-[#0f4c3a]/10">
              <div className="w-24 h-24 rounded-2xl bg-[#0f4c3a] flex items-center justify-center text-white text-4xl font-outfit font-bold mb-6 mx-auto">
                Z
              </div>
              <h2 className="text-center font-outfit font-bold text-xl text-slate-800 mb-1">
                Mohammed Zaheeruddin
              </h2>
              <p className="text-center text-sm text-[#0f4c3a] font-medium mb-6">
                Philanthropist • Educationist • Real Estate Developer
              </p>

              {/* Institution cards */}
              <div className="space-y-3">
                {[
                  "Tipu Sultan Unani Medical College",
                  "Tipu Sultan Pharmacy College",
                  "Chincholi Heights — Premium Plots",
                  "Multiple Trusts & Foundations",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#f2f7f5] rounded-xl px-4 py-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#0f4c3a] flex-shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-lg px-5 py-3 border border-slate-100">
              <div className="text-[#0f4c3a] font-outfit font-bold text-2xl">6+</div>
              <div className="text-xs text-slate-500">Institutions</div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#0f4c3a] rounded-2xl shadow-lg px-5 py-3 text-white">
              <div className="font-outfit font-bold text-2xl">25+</div>
              <div className="text-xs opacity-80">Years of Service</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400"
      >
        <span className="text-xs">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
