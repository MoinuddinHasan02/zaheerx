"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  AlertCircle,
  Globe,
  Eye,
  EyeOff,
  Menu,
  Settings,
  Users as UsersIcon,
  Home,
  MapPin,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  published: boolean;
  createdAt: string;
}
interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}
interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  highlight: string;
  status: string;
  features: string;
  imageUrl?: string;
  order: number;
}
interface Institution {
  id: string;
  name: string;
  description: string;
  logo?: string;
  imageUrl?: string;
  courses?: string;
  order: number;
}

type Tab = "dashboard" | "projects" | "posts" | "institutions" | "leads" | "settings";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  tab,
  setTab,
  mobileOpen,
  setMobileOpen,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const links: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { id: "projects", label: "Properties", Icon: Home },
    { id: "leads", label: "Leads", Icon: UsersIcon },
    { id: "posts", label: "Blog Posts", Icon: BookOpen },
    { id: "institutions", label: "Institutions", Icon: Building2 },
    { id: "settings", label: "Settings", Icon: Settings },
  ];

  return (
    <>
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0f4c3a] text-white z-30 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-outfit font-bold text-lg">
              Z
            </div>
            <div>
              <div className="font-outfit font-semibold text-sm">Admin Panel</div>
              <div className="text-white/50 text-xs">zaheerx.com</div>
            </div>
          </div>
          <button
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Footer links */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <Globe size={18} /> View Website
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Dashboard tab ────────────────────────────────────────────────────────────
function DashboardTab({
  posts,
  institutions,
  enquiries,
  projects,
}: {
  posts: Post[];
  institutions: Institution[];
  enquiries: Enquiry[];
  projects: Project[];
}) {
  return (
    <div>
      <h1 className="font-outfit font-bold text-2xl text-slate-900 mb-6">
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        {[
          {
            label: "Total Posts",
            value: posts.length,
            icon: BookOpen,
            color: "bg-blue-50 text-blue-600",
          },
          {
            label: "Published Posts",
            value: posts.filter((p) => p.published).length,
            icon: Check,
            color: "bg-green-50 text-green-600",
          },
          {
            label: "Institutions",
            value: institutions.length,
            icon: Building2,
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Properties",
            value: projects.length,
            icon: Home,
            color: "bg-indigo-50 text-indigo-600",
          },
          {
            label: "Total Leads",
            value: enquiries.length,
            icon: UsersIcon,
            color: "bg-amber-50 text-amber-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}
            >
              <s.icon size={20} />
            </div>
            <div className="font-outfit font-bold text-3xl text-slate-900">
              {s.value}
            </div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-outfit font-semibold text-slate-800 mb-4">
            Recent Posts
          </h2>
          {posts.length === 0 ? (
            <p className="text-slate-400 text-sm">No posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {posts.slice(0, 5).map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <span className="text-sm text-slate-700 truncate max-w-[150px] sm:max-w-xs">
                    {p.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.published
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-outfit font-semibold text-slate-800 mb-4">
            Recent Leads
          </h2>
          {enquiries.length === 0 ? (
            <p className="text-slate-400 text-sm">No enquiries yet.</p>
          ) : (
            <ul className="space-y-3">
              {enquiries.slice(0, 5).map((e) => (
                <li
                  key={e.id}
                  className="py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-slate-800 truncate">
                      {e.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">{e.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Leads Tab ────────────────────────────────────────────────────────────────
function LeadsTab({
  enquiries,
  setEnquiries,
  reload,
}: {
  enquiries: Enquiry[];
  setEnquiries: (v: Enquiry[]) => void;
  reload: () => void;
}) {
  const [msg, setMsg] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const del = async (id: string) => {
    setConfirmId(null);
    setEnquiries(enquiries.filter(e => e.id !== id));
    setMsg("Lead deleted successfully.");
    try {
      await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      reload();
    } catch (error) {
      setMsg("A network error occurred.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <h1 className="font-outfit font-bold text-2xl text-slate-900 mb-6">
        Contact Enquiries (Leads)
      </h1>
      {msg && (
        <div className="mb-4 flex items-center gap-2 text-sm p-3 rounded-xl bg-[#0f4c3a]/10 text-[#0f4c3a]">
          <AlertCircle size={14} /> {msg}
        </div>
      )}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <UsersIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p>No enquiries received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{e.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-700">{e.email}</div>
                      <div className="text-xs text-slate-400">{e.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-xs">{e.message}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {confirmId === e.id ? (
                        <div className="flex items-center justify-end gap-1 animate-in slide-in-from-right-2">
                          <button onClick={() => del(e.id)} className="bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Yes, Delete</button>
                          <button onClick={() => setConfirmId(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(e.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "info" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const resetPass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg({ text: "New passwords do not match.", type: "error" });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ text: "Password must be at least 6 characters.", type: "error" });
      return;
    }

    setLoading(true);
    setMsg({ text: "", type: "info" });

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ text: "Password updated successfully!", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMsg({ text: data.error || "Failed to update password.", type: "error" });
      }
    } catch {
      setMsg({ text: "An error occurred.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-outfit font-bold text-2xl text-slate-900 mb-6">
        Settings
      </h1>
      
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h2 className="font-outfit font-bold text-lg text-slate-800 mb-1">
          Change Admin Password
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Ensure your account stays secure by using a strong password.
        </p>

        {msg.text && (
          <div className={`flex items-center gap-2 p-4 rounded-xl text-sm mb-6 ${
            msg.type === 'success' ? 'bg-green-50 text-green-700' : 
            msg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
          }`}>
            <AlertCircle size={16} />
            {msg.text}
          </div>
        )}

        <form onSubmit={resetPass} className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">Current Password</label>
            <input
              type={showPass ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              placeholder="••••••••"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">New Password</label>
              <input
                type={showPass ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase">Confirm New</label>
              <input
                type={showPass ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              className="text-xs font-medium text-slate-500 hover:text-[#0f4c3a] flex items-center gap-1 transition-colors"
            >
              {showPass ? <EyeOff size={14}/> : <Eye size={14}/>} {showPass ? "Hide Passwords" : "Show Passwords"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-[#0f4c3a] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#166b52] transition-all disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Posts tab ────────────────────────────────────────────────────────────────
function PostsTab({ posts, setPosts, reload }: { posts: Post[]; setPosts: (v: Post[]) => void; reload: () => void }) {
  const empty = {
    title: "",
    slug: "",
    content: "",
    image: "",
    published: false,
  };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const slugify = (s: string) =>
    s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const save = async () => {
    if (!form.title || !form.slug || !form.content) {
      setMsg("Title, slug, and content are required.");
      return;
    }
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/posts/${editing}` : "/api/posts";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMsg(editing ? "Post updated!" : "Post created!");
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      reload();
    } else {
      setMsg("Error saving post.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const del = async (id: string) => {
    setConfirmId(null);
    setPosts(posts.filter(p => p.id !== id));
    setMsg("Post deleted successfully.");
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      reload();
    } catch (error) {
      setMsg("A network error occurred.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const edit = (p: Post) => {
    setForm({
      title: p.title,
      slug: p.slug,
      content: p.content,
      image: p.image ?? "",
      published: p.published,
    });
    setEditing(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const togglePublish = async (p: Post) => {
    await fetch(`/api/posts/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    reload();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-outfit font-bold text-2xl text-slate-900">
          Blog Posts
        </h1>
        <button
          onClick={() => {
            setForm(empty);
            setEditing(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-[#0f4c3a] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#166b52] transition-all"
        >
          <Plus size={16} />
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {msg && (
        <div className="mb-6 flex items-center gap-2 text-sm p-3 rounded-xl bg-[#0f4c3a]/10 text-[#0f4c3a] animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle size={14} /> {msg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-outfit font-semibold text-slate-800">
            {editing ? "Edit Post" : "Create New Post"}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: editing ? f.slug : slugify(e.target.value),
                  }));
                }}
                placeholder="Post title"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Slug *
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                placeholder="url-friendly-slug"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Image URL (optional)
            </label>
            <input
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Content *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={8}
              placeholder="Write your post content here... (HTML is supported)"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 resize-y font-mono"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 accent-[#0f4c3a]"
              />
              <span className="text-sm text-slate-700">Publish immediately</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              className="flex items-center gap-2 bg-[#0f4c3a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#166b52] transition-all"
            >
              <Check size={14} />
              {editing ? "Update Post" : "Create Post"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setForm(empty);
              }}
              className="px-5 py-2.5 rounded-xl text-sm border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>No posts yet. Create your first post above.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 truncate text-sm">
                    {p.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">/{p.slug}</div>
                </div>
                <span
                  className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${
                    p.published
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {p.published ? "Published" : "Draft"}
                </span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => togglePublish(p)}
                    title={p.published ? "Unpublish" : "Publish"}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#0f4c3a] hover:bg-[#0f4c3a]/10 transition-all"
                  >
                    {p.published ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    onClick={() => edit(p)}
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <Pencil size={15} />
                  </button>
                  {confirmId === p.id ? (
                    <div className="flex items-center gap-1 ml-1 animate-in slide-in-from-right-2">
                      <button onClick={() => del(p.id)} className="bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Yes, Delete</button>
                      <button onClick={() => setConfirmId(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Cancel</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(p.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab({ projects, setProjects, reload }: { projects: Project[]; setProjects: (v: Project[]) => void; reload: () => void }) {
  const empty = {
    name: "",
    location: "",
    description: "",
    highlight: "",
    status: "Available",
    features: "",
    imageUrl: "",
    order: 0,
  };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const save = async () => {
    if (!form.name || !form.location || !form.description) {
      setMsg("Name, location, and description are required.");
      return;
    }
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/projects/${editing}` : "/api/projects";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMsg(editing ? "Property updated!" : "Property added!");
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      reload();
    } else {
      setMsg("Error saving.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const del = async (id: string) => {
    setConfirmId(null);
    setProjects(projects.filter(p => p.id !== id));
    setMsg("Property deleted successfully.");
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      reload();
    } catch (error) {
      setMsg("A network error occurred.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const edit = (p: Project) => {
    setForm({
      name: p.name,
      location: p.location,
      description: p.description,
      highlight: p.highlight,
      status: p.status,
      features: p.features,
      imageUrl: p.imageUrl ?? "",
      order: p.order,
    });
    setEditing(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-outfit font-bold text-2xl text-slate-900">
          Real Estate Properties
        </h1>
        <button
          onClick={() => {
            setForm(empty);
            setEditing(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-[#0f4c3a] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#166b52]"
        >
          <Plus size={16} />
          {showForm ? "Cancel" : "Add Property"}
        </button>
      </div>

      {msg && (
        <div className="mb-6 flex items-center gap-2 text-sm p-3 rounded-xl bg-[#0f4c3a]/10 text-[#0f4c3a] animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle size={14} /> {msg}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-outfit font-semibold text-slate-800">
            {editing ? "Edit Property" : "Add New Property"}
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Location *</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Highlight</label>
              <input
                value={form.highlight}
                onChange={(e) => setForm({ ...form, highlight: e.target.value })}
                placeholder="e.g. Premium Investment"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              >
                <option value="Available">Available</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Features (comma-separated)</label>
            <input
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              placeholder="NA Approved, Gated Community, Road Access..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Image URL</label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={save} className="bg-[#0f4c3a] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#166b52]">
              {editing ? "Update" : "Save Property"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm(empty); }} className="px-6 py-2 rounded-xl border border-slate-200 text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Home size={40} className="mx-auto mb-3 opacity-30" />
            <p>No properties listed yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {projects.map((p) => (
              <div key={p.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 text-sm">{p.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      p.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>{p.status}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} /> {p.location}
                  </div>
                  <div className="text-xs text-slate-600 mt-2 line-clamp-1">{p.description}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => edit(p)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                    <Pencil size={15} />
                  </button>
                  {confirmId === p.id ? (
                    <div className="flex items-center gap-1 ml-1 animate-in slide-in-from-right-2">
                      <button onClick={() => del(p.id)} className="bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Yes, Delete</button>
                      <button onClick={() => setConfirmId(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmId(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Institutions tab ─────────────────────────────────────────────────────────
function InstitutionsTab({
  institutions,
  setInstitutions,
  reload,
}: {
  institutions: Institution[];
  setInstitutions: (v: Institution[]) => void;
  reload: () => void;
}) {
  const empty = {
    name: "",
    description: "",
    logo: "",
    imageUrl: "",
    courses: "",
    order: 0,
  };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const save = async () => {
    if (!form.name || !form.description) {
      setMsg("Name and description are required.");
      return;
    }
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/institutions/${editing}` : "/api/institutions";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMsg(editing ? "Institution updated!" : "Institution added!");
      setForm(empty);
      setEditing(null);
      setShowForm(false);
      reload();
    } else {
      setMsg("Error saving.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const del = async (id: string) => {
    setConfirmId(null);
    setInstitutions(institutions.filter(inst => inst.id !== id));
    setMsg("Institution deleted successfully.");
    try {
      await fetch(`/api/institutions/${id}`, { method: "DELETE" });
      reload();
    } catch (error) {
      setMsg("A network error occurred.");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const edit = (inst: Institution) => {
    setForm({
      name: inst.name,
      description: inst.description,
      logo: inst.logo ?? "",
      imageUrl: inst.imageUrl ?? "",
      courses: inst.courses ?? "",
      order: inst.order,
    });
    setEditing(inst.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-outfit font-bold text-2xl text-slate-900">
          Institutions
        </h1>
        <button
          onClick={() => {
            setForm(empty);
            setEditing(null);
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-[#0f4c3a] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#166b52] transition-all"
        >
          <Plus size={16} />
          {showForm ? "Cancel" : "Add Institution"}
        </button>
      </div>

      {msg && (
        <div className="mb-6 flex items-center gap-2 text-sm p-3 rounded-xl bg-[#0f4c3a]/10 text-[#0f4c3a] animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle size={14} /> {msg}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 space-y-4">
          <h2 className="font-outfit font-semibold text-slate-800">
            {editing ? "Edit Institution" : "Add Institution"}
          </h2>
          {[
            { key: "name", label: "Name *", placeholder: "Institution name" },
            { key: "logo", label: "Logo URL", placeholder: "https://..." },
            { key: "imageUrl", label: "Image URL", placeholder: "https://..." },
            { key: "courses", label: "Courses (comma-separated)", placeholder: "BUMS, Pharmacy..." },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                {f.label}
              </label>
              <input
                value={form[f.key as keyof typeof form] as string}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                placeholder={f.placeholder}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={4}
              placeholder="Institution description..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
              className="w-24 px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f4c3a]/30"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={save}
              className="flex items-center gap-2 bg-[#0f4c3a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#166b52]"
            >
              <Check size={14} />
              {editing ? "Update" : "Save"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditing(null); setForm(empty); }}
              className="px-5 py-2.5 rounded-xl text-sm border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {institutions.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Building2 size={40} className="mx-auto mb-3 opacity-30" />
            <p>No institutions yet. Add one above.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {institutions.map((inst) => (
              <div key={inst.id} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-sm">{inst.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate">{inst.description}</div>
                  {inst.courses && (
                    <div className="text-xs text-[#0f4c3a] mt-1">{inst.courses}</div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => edit(inst)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                    <Pencil size={15} />
                  </button>
                  {confirmId === inst.id ? (
                    <div className="flex items-center gap-1 ml-1 animate-in slide-in-from-right-2">
                      <button onClick={() => del(inst.id)} className="bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Yes, Delete</button>
                      <button onClick={() => setConfirmId(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded transition-all">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmId(inst.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50">
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [posts, setPosts] = useState<Post[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const loadData = useCallback(async () => {
    const [p, i, e, pr] = await Promise.all([
      fetch("/api/posts").then((r) => r.json()).catch(() => []),
      fetch("/api/institutions").then((r) => r.json()).catch(() => []),
      fetch("/api/enquiries").then((r) => r.json()).catch(() => []),
      fetch("/api/projects").then((r) => r.json()).catch(() => []),
    ]);
    setPosts(Array.isArray(p) ? p : []);
    setInstitutions(Array.isArray(i) ? i : []);
    setEnquiries(Array.isArray(e) ? e : []);
    setProjects(Array.isArray(pr) ? pr : []);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="min-h-screen bg-[#f2f7f5] flex">
      <Sidebar
        tab={tab}
        setTab={setTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-slate-600"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="text-sm text-slate-500">
            Welcome back, <span className="font-semibold text-slate-800">Admin</span>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
          {tab === "dashboard" && (
            <DashboardTab 
              posts={posts} 
              institutions={institutions} 
              enquiries={enquiries} 
              projects={projects} 
            />
          )}
          {tab === "projects" && (
            <ProjectsTab projects={projects} setProjects={setProjects} reload={loadData} />
          )}
          {tab === "leads" && (
            <LeadsTab enquiries={enquiries} setEnquiries={setEnquiries} reload={loadData} />
          )}
          {tab === "posts" && (
            <PostsTab posts={posts} setPosts={setPosts} reload={loadData} />
          )}
          {tab === "institutions" && (
            <InstitutionsTab institutions={institutions} setInstitutions={setInstitutions} reload={loadData} />
          )}
          {tab === "settings" && (
            <SettingsTab />
          )}
        </div>
      </div>
    </div>
  );
}
