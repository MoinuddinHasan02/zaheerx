import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const post = await prisma.post.update({ where: { id }, data: body });
  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    console.log("DELETE Post: Unauthorized attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    console.log(`DELETE Post: Attempting to delete ID: ${id}`);
    const deleted = await prisma.post.delete({ where: { id } });
    console.log(`DELETE Post: Successfully deleted ID: ${id}`);
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error(`DELETE Post: Error deleting ID:`, error);
    return NextResponse.json({ error: error.message || "Failed to delete post" }, { status: 500 });
  }
}
