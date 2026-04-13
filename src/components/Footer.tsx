import { Building2, BookOpen, Home, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#0f4c3a] flex items-center justify-center text-white font-outfit font-bold text-lg">
                Z
              </div>
              <span className="font-outfit font-semibold text-white text-lg">
                Zaheeruddin
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Building a better Gulbarga through quality education, community
              welfare, and premium real estate.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} Mohammed Zaheeruddin. All rights reserved.
            </div>
          </div>

          {/* Institutions */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-[#0f4c3a]" />
              Institutions
            </h4>
            <ul className="space-y-2">
              {[
                "Tipu Sultan Unani Medical College",
                "Tipu Sultan College of Pharmacy",
                "Tipu Sultan Degree College",
                "Tipu Sultan PU College",
                "Tipu Sultan ITI",
                "Gulbarga Educational Trust",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#institutions"
                    className="text-slate-400 text-sm hover:text-[#6fcf97] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Real Estate */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 flex items-center gap-2">
              <Home size={16} className="text-[#0f4c3a]" />
              Real Estate
            </h4>
            <ul className="space-y-2">
              {["Chincholi Heights", "Gulbarga Urban Estates", "Real Estate Enquiry"].map((item) => (
                <li key={item}>
                  <a
                    href="#realestate"
                    className="text-slate-400 text-sm hover:text-[#6fcf97] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-outfit font-semibold text-white mt-8 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Blog", "Admin"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    className="text-slate-400 text-sm hover:text-[#6fcf97] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-[#0f4c3a] flex-shrink-0 mt-0.5" />
                Gulbarga (Kalaburagi), Karnataka, India — 585 101
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-[#0f4c3a] flex-shrink-0" />
                +91 98450 00000
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-[#0f4c3a] flex-shrink-0" />
                info@zaheerx.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>Built with ❤️ for Gulbarga Community</span>
          <div className="flex gap-4">
            <a href="/en" className="hover:text-[#6fcf97]">English</a>
            <a href="/ur" className="hover:text-[#6fcf97]">اردو</a>
            <a href="/admin" className="hover:text-[#6fcf97]">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
