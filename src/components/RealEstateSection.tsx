"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, CheckCircle2 } from "lucide-react";

const fallbackProjects = [
  {
    name: "Malgatti Road Layout",
    location: "Malgatti Road, Gulbarga",
    description: "Premium NA GDA open plots surrounded by nature and future developments. Ideal for investors looking for high growth in a peaceful environment.",
    features: "NA Approved, GDA Layout, Gated Community, Road Access, Electricity, Water Connection",
    highlight: "Booking Open",
    status: "Available",
  },
  {
    name: "Ring Road Properties",
    location: "Beside Asian Hospital, Ring Road, Gulbarga",
    description: "Prime commercial and residential spaces with highest visibility and access. Perfect for business hubs or premium residential apartments.",
    features: "Main Road Visibility, Commercial Potential, GDA Approved, Modern Infrastructure, Prime Connectivity",
    highlight: "High ROI",
    status: "Available",
  },
  {
    name: "Chincholi Heights",
    location: "Chincholi area, Gulbarga District",
    description: "Accessible, high-value open plots for long-term secure investment in the rapidly developing Chincholi region.",
    features: "Strategic Location, Clear Legal Title, Rapid Appreciation, Flexible Plot Sizes, Investment Friendly",
    highlight: "Newly Launched",
    status: "Available",
  },
  {
    name: "Humnabad Ring Road",
    location: "Near Uploan, Humnabad Ring Road, Gulbarga",
    description: "Strategic investments catering to the upcoming urban expansion. Great connectivity to major highways and city center.",
    features: "Highway Connectivity, Near Urban Center, Future Expansion Zone, All Legal Clearances, Immediate Possession",
    highlight: "Fast Filling",
    status: "Available",
  },
];

export default function RealEstateSection() {
  const [projectsList, setProjectsList] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        } else {
          setProjectsList(fallbackProjects);
        }
      })
      .catch(() => setProjectsList(fallbackProjects));
  }, []);
  return (
    <section id="realestate" className="py-24 bg-gradient-to-br from-[#f2f7f5] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Real Estate Projects
          </span>
          <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
            Premium Land & Property Projects
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Invest in land parcels that promise long-term value appreciation,
            with full legal clarity and modern infrastructure in Gulbarga region.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projectsList.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#0f4c3a]/10 transition-all duration-300 group"
            >
              {/* Top banner */}
              <div className="bg-gradient-to-r from-[#0f4c3a] to-[#166b52] p-6 relative overflow-hidden">
                <div className="absolute right-4 top-4 opacity-10">
                  <Home size={80} />
                </div>
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {project.status}
                </span>
                <h3 className="font-outfit font-bold text-2xl text-white mb-2">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin size={14} />
                  {project.location}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-amber-200">
                  ★ {project.highlight}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {(typeof project.features === 'string' ? project.features.split(',') : project.features).map((f: string) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} className="text-[#0f4c3a] flex-shrink-0" />
                      {f.trim()}
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/917795140616?text=Hi, I am interested in ${encodeURIComponent(project.name)} at ${encodeURIComponent(project.location)}. Please provide more details.`}
                  target="_blank"
                  className="w-full block text-center bg-[#0f4c3a] text-white py-3 rounded-xl font-semibold hover:bg-[#166b52] transition-colors active:scale-95"
                >
                  Enquire Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#0f4c3a] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white"
        >
          <div>
            <h3 className="font-outfit font-bold text-2xl mb-2">
              Interested in Our Properties?
            </h3>
            <p className="text-white/70">
              Contact us for site visits, pricing, and legal documentation.
            </p>
          </div>
          <a
            href="https://wa.me/917795140616?text=Hi, I would like to schedule a visit to one of your real estate projects."
            target="_blank"
            className="flex-shrink-0 bg-white text-[#0f4c3a] font-bold px-8 py-3 rounded-full hover:bg-[#f2f7f5] transition-colors"
          >
            Schedule a Visit
          </a>
        </motion.div>

      </div>
    </section>
  );
}
