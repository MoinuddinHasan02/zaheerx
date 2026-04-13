import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Admin Panel — Zaheerx",
  description: "Content management for zaheerx.com",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#f2f7f5] text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
