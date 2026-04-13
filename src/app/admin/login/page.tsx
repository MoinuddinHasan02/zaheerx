"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#0f4c3a] flex items-center justify-center text-white font-outfit font-bold text-3xl mx-auto mb-4">
            Z
          </div>
          <h1 className="font-outfit font-bold text-2xl text-slate-900">
            Admin Login
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to manage content on zaheerx.com
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-5 border border-slate-100"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@zaheerx.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 focus:border-[#0f4c3a] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 focus:border-[#0f4c3a] text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f4c3a] text-white py-3.5 rounded-xl font-semibold hover:bg-[#166b52] disabled:opacity-60 transition-all active:scale-95"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-center text-xs text-slate-400">
            Default admin: admin@zaheerx.com / admin123{" "}
            <span className="text-red-400">(change after first login)</span>
          </p>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-slate-500 hover:text-[#0f4c3a]">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
