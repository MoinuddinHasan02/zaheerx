"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  image?: string;
  createdAt: string;
  content: string;
}

// Static fallback posts for display before DB has entries
const samplePosts: Post[] = [
  {
    id: "1",
    title: "Tipu Sultan Unani Medical College Celebrates Annual Convocation",
    slug: "convocation-2024",
    createdAt: "2024-10-15T00:00:00.000Z",
    content:
      "The annual convocation ceremony was held with great fanfare, celebrating the achievements of graduating students in the BUMS program...",
  },
  {
    id: "2",
    title: "Chincholi Heights — New Phase of Plots Now Available",
    slug: "chincholi-heights-new-phase",
    createdAt: "2024-09-02T00:00:00.000Z",
    content:
      "We are pleased to announce the launch of Phase 2 of Chincholi Heights, a gated residential plotting scheme with NA approval...",
  },
  {
    id: "3",
    title: "Pharmacy College Students Win State-Level Quiz Competition",
    slug: "pharmacy-quiz-winners",
    createdAt: "2024-08-20T00:00:00.000Z",
    content:
      "Students from Tipu Sultan College of Pharmacy brought home top honors at the State-Level Pharmacy Knowledge Competition...",
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function truncate(text: string, len = 100) {
  // Strip any HTML tags from content
  const stripped = text.replace(/<[^>]+>/g, "");
  return stripped.length > len ? stripped.slice(0, len) + "…" : stripped;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts?published=true&limit=3")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.length > 0 ? data : samplePosts);
      })
      .catch(() => setPosts(samplePosts))
      .finally(() => setLoading(false));
  }, []);

  const displayPosts = loading ? samplePosts : posts;

  return (
    <section id="blog" className="py-24 bg-[#f2f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block bg-[#0f4c3a]/10 text-[#0f4c3a] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Latest Updates
            </span>
            <h2 className="font-outfit font-bold text-4xl text-slate-900">
              News & Blog
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0f4c3a] font-semibold hover:gap-3 transition-all"
          >
            View All Posts <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-[#0f4c3a]/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="h-44 bg-gradient-to-br from-[#0f4c3a]/20 to-[#0f4c3a]/5 flex items-center justify-center relative overflow-hidden">
                {post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen size={48} className="text-[#0f4c3a]/30" />
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Calendar size={11} />
                  {formatDate(post.createdAt)}
                </div>
                <h3 className="font-outfit font-bold text-slate-900 mb-2 group-hover:text-[#0f4c3a] transition-colors line-clamp-2 text-base leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {truncate(post.content, 110)}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f4c3a] group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
