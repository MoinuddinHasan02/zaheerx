import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  return {
    title: post ? `${post.title} | Zaheerx Blog` : "Post Not Found",
    description: post?.content?.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug, published: true } });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#f2f7f5]">
      {/* Header */}
      <div className="bg-[#0f4c3a] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="font-outfit font-bold text-3xl sm:text-4xl leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar size={14} />
            {formatDate(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-2xl mb-8 object-cover max-h-72"
          />
        )}
        <div
          className="prose prose-slate prose-headings:font-outfit prose-a:text-[#0f4c3a] max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
