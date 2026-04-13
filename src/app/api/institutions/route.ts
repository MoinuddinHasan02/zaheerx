import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";


export async function GET(_req: NextRequest) {
  const institutions = await prisma.institution.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(institutions);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, description, logo, imageUrl, courses, order } = body;
  if (!name || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const institution = await prisma.institution.create({
    data: { name, description, logo, imageUrl, courses, order: order ?? 0 },
  });
  return NextResponse.json(institution, { status: 201 });
}
