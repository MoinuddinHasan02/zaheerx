import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InstitutionsSection from "@/components/InstitutionsSection";
import RealEstateSection from "@/components/RealEstateSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mohammed Zaheeruddin (Tipu) — Trusts, Institutions & Real Estate | Gulbarga",
  description:
    "Mohammed Zaheeruddin (Tipu) is the driving force behind Tipu Sultan Unani Medical College, Pharmacy colleges, and premium real estate projects in Gulbarga. Dedicated to education and community development.",
  keywords:
    "Mohammed Zaheeruddin, Tipu Gulbarga, Colleges in Gulbarga, Pharmacy college Gulbarga, NA plots Gulbarga, Tipu Sultan Unani Medical College",
  openGraph: {
    title: "Mohammed Zaheeruddin (Tipu) — Education & Real Estate | Gulbarga",
    description:
      "Visionary leader in education and real estate, Gulbarga Karnataka.",
    type: "website",
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Navbar locale={locale} />
      <HeroSection />
      <AboutSection />
      <InstitutionsSection />
      <RealEstateSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
