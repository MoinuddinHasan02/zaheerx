"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Award, MapPin } from "lucide-react";

const institutions = [
  {
    name: "Tipu Sultan Unani Medical College",
    description:
      "A premier institution offering BUMS (Bachelor of Unani Medicine & Surgery) affiliated with RGUHS. Committed to holistic medical education blending traditional Unani wisdom with modern clinical practices.",
    courses: ["BUMS", "Unani Medicine", "Clinical Training"],
    type: "Medical College",
    color: "from-emerald-50 to-teal-50",
    accent: "#0f4c3a",
  },
  {
    name: "Tipu Sultan College of Pharmacy",
    description:
      "A leading pharmacy college offering D.Pharm and B.Pharm programs, building the next generation of pharmaceutical professionals in the Gulbarga region.",
    courses: ["D.Pharm", "B.Pharm", "Pharmaceutical Sciences"],
    type: "Pharmacy College",
    color: "from-green-50 to-emerald-50",
    accent: "#166b52",
  },
  {
    name: "Tipu Sultan Degree College",
    description:
      "Offering quality undergraduate education in science, commerce, and arts streams, preparing students for a competitive world with strong academic foundations.",
    courses: ["B.Sc", "B.Com", "BA", "Arts & Science"],
    type: "Degree College",
    color: "from-teal-50 to-cyan-50",
    accent: "#0f4c3a",
  },
  {
    name: "Tipu Sultan PU College",
    description:
      "Pre-University college providing sound foundation in science, commerce, and arts for students preparing for competitive exams and higher education.",
    courses: ["Science", "Commerce", "Arts", "PUC"],
    type: "Pre-University",
    color: "from-slate-50 to-green-50",
    accent: "#166b52",
  },
  {
    name: "Tipu Sultan ITI",
    description:
      "Industrial Training Institute offering vocational courses that equip students with hands-on technical skills for immediate employment in various industries.",
    courses: ["Electrician", "Fitter", "Welding", "Technical Trades"],
    type: "Technical Institute",
    color: "from-emerald-50 to-green-50",
    accent: "#0f4c3a",
  },
  {
    name: "Gulbarga Educational Trust",
    description:
      "The charitable trust that anchors all educational initiatives under Mohammed Zaheeruddin's vision, promoting accessible, quality education for all sections of society in Gulbarga.",
    courses: ["Trust Governance", "Social Welfare", "Education Policy"],
    type: "Charitable Trust",
    color: "from-green-50 to-teal-50",
    accent: "#166b52",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function InstitutionsSection() {
  return (
    <section id="institutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Educational Institutions
          </span>
          <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
            Shaping Futures Through Education
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            A network of institutions built over decades of dedication to
            accessible, quality education across medical, pharmacy, technical,
            and general streams.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map((inst, i) => (
            <motion.div
              key={inst.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`group bg-gradient-to-br ${inst.color} rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:shadow-[#0f4c3a]/10 transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Type badge */}
              <div
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 text-white"
                style={{ backgroundColor: inst.accent }}
              >
                {inst.type}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: inst.accent + "18" }}
              >
                <BookOpen size={22} style={{ color: inst.accent }} />
              </div>

              <h3 className="font-outfit font-bold text-lg text-slate-900 mb-3 group-hover:text-[#0f4c3a] transition-colors">
                {inst.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                {inst.description}
              </p>

              {/* Courses */}
              <div className="flex flex-wrap gap-2">
                {inst.courses.map((course) => (
                  <span
                    key={course}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/70 border border-slate-200 text-slate-700 font-medium"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-3 gap-6"
        >
          {[
            { icon: BookOpen, value: "6+", label: "Institutions Established" },
            { icon: Users, value: "1000+", label: "Students Enrolled Annually" },
            { icon: Award, value: "25+", label: "Years of Educational Service" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-[#f2f7f5] rounded-2xl p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0f4c3a] flex items-center justify-center flex-shrink-0">
                <stat.icon size={22} className="text-white" />
              </div>
              <div>
                <div className="font-outfit font-bold text-2xl text-slate-900">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
