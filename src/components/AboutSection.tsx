"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#0f4c3a] to-[#166b52] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="font-outfit font-bold text-3xl mb-4">
                  A Legacy of Service
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Mohammed Zaheeruddin (Tipu) has dedicated his life to uplifting
                  the community of Gulbarga through quality education, healthcare
                  access, and sustainable real estate development.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "6+", label: "Institutions" },
                    { value: "25+", label: "Years Service" },
                    { value: "1000+", label: "Students" },
                    { value: "3+", label: "Real Estate Projects" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 rounded-xl p-4">
                      <div className="font-outfit font-bold text-2xl">{s.value}</div>
                      <div className="text-white/70 text-xs mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              About
            </span>
            <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-6 leading-tight">
              Mohammed Zaheeruddin —{" "}
              <span className="text-[#0f4c3a]">Educator, Philanthropist & Developer</span>
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Mohammed Zaheeruddin, popularly known as Tipu, is one of the most
                respected philanthropists and institution builders in the
                Gulbarga (Kalaburagi) region of Karnataka. Born and raised in the
                city, he developed a deep commitment to social welfare and community
                development from an early age.
              </p>
              <p>
                His crowning achievement is the establishment of{" "}
                <strong className="text-slate-800">
                  Tipu Sultan Unani Medical College
                </strong>
                , which offers BUMS degrees and has produced hundreds of qualified
                medical professionals. Alongside this, he has established multiple
                colleges, including pharmacy, degree, PU, and ITI colleges, all
                under the umbrella of the{" "}
                <strong className="text-slate-800">Gulbarga Educational Trust</strong>.
              </p>
              <p>
                Beyond education, Mohammed Zaheeruddin has made significant
                contributions to the real estate sector, developing premium
                residential plotting schemes including{" "}
                <strong className="text-slate-800">Chincholi Heights</strong> that
                provide quality housing solutions for the people of the region.
              </p>
              <p>
                His vision is guided by the principle that access to quality
                education and dignified living are every person's birthright,
                regardless of their economic background.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="#institutions"
                className="inline-flex bg-[#0f4c3a] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#166b52] transition-all"
              >
                Our Institutions
              </a>
              <a
                href="#contact"
                className="inline-flex border-2 border-[#0f4c3a] text-[#0f4c3a] px-6 py-3 rounded-full font-semibold hover:bg-[#0f4c3a]/5 transition-all"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
