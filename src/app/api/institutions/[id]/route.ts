import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const institution = await prisma.institution.update({ where: { id }, data: body });
  return NextResponse.json(institution);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    console.log("DELETE Institution: Unauthorized attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    console.log(`DELETE Institution: Attempting to delete ID: ${id}`);
    const deleted = await prisma.institution.delete({ where: { id } });
    console.log(`DELETE Institution: Successfully deleted ID: ${id}`);
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error(`DELETE Institution: Error deleting ID:`, error);
    return NextResponse.json({ error: error.message || "Failed to delete institution" }, { status: 500 });
  }
}
