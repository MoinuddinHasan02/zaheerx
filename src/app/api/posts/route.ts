import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const published = searchParams.get("published");
  const limit = parseInt(searchParams.get("limit") || "10");

  const posts = await prisma.post.findMany({
    where: published === "true" ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      image: true,
      createdAt: true,
      content: true,
      published: true,
    },
  });

  return NextResponse.json(posts);
}

import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, content, image, published } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { title, slug, content, image, published: published ?? false },
  });

  return NextResponse.json(post, { status: 201 });
}
