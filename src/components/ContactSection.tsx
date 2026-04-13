"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validation";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        
        // Construct WhatsApp message
        const whatsappNumber = "917795140616";
        const message = `Hello, I'm ${data.name}. %0AEnquiry Details: %0AEmail: ${data.email} %0APhone: ${data.phone} %0AMessage: ${data.message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, "_blank");
        
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Contact Us
          </span>
          <h2 className="font-outfit font-bold text-4xl text-slate-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            For admissions, real estate enquiries, or any other information,
            reach out and we'll respond promptly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: MapPin,
                title: "Location",
                detail: "Gulbarga (Kalaburagi), Karnataka, India - 585 101",
                link: "https://maps.google.com/maps?q=Gulbarga%2C+Karnataka%2C+India",
              },
              {
                icon: Phone,
                title: "Phone",
                detail: "+91 77951 40616",
                link: "tel:+917795140616",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "info@zaheerx.com",
                link: "mailto:info@zaheerx.com",
              },
            ].map((item) => (
              <a 
                href={item.link} 
                key={item.title} 
                target={item.link.startsWith("http") ? "_blank" : undefined}
                className="flex items-start gap-4 hover:translate-x-1 transition-transform group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0f4c3a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0f4c3a]/20 transition-colors">
                  <item.icon size={20} className="text-[#0f4c3a]" />
                </div>
                <div>
                  <div className="font-outfit font-semibold text-slate-800 mb-1">
                    {item.title}
                  </div>
                  <div className="text-slate-600 text-sm group-hover:text-[#0f4c3a] transition-colors">{item.detail}</div>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 h-56 bg-[#f2f7f5] flex items-center justify-center">
              <iframe
                title="Gulbarga Location"
                className="w-full h-full"
                loading="lazy"
                src="https://maps.google.com/maps?q=Gulbarga%2C+Karnataka%2C+India&output=embed"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#f2f7f5] rounded-3xl p-8 space-y-5"
          >
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name</label>
              <input
                {...register("name")}
                placeholder="Mohammed Ali"
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 focus:border-[#0f4c3a] text-sm transition-all`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12}/> {errors.name.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <input
                {...register("email")}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 focus:border-[#0f4c3a] text-sm transition-all`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12}/> {errors.email.message}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
              <input
                {...register("phone")}
                placeholder="+91 00000 00000"
                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 focus:border-[#0f4c3a] text-sm transition-all`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12}/> {errors.phone.message}</p>}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Your enquiry or message..."
                className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 focus:border-[#0f4c3a] text-sm transition-all resize-none`}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12}/> {errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#0f4c3a] text-white py-3.5 rounded-xl font-semibold hover:bg-[#166b52] disabled:opacity-60 transition-all active:scale-95"
            >
              {isSubmitting ? (
                "Sending…"
              ) : (
                <>
                  Connect via WhatsApp <Send size={16} />
                </>
              )}
            </button>

            {status === "sent" && (
              <p className="text-green-600 text-sm text-center font-medium">
                ✓ Lead saved! Redirecting to WhatsApp...
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
