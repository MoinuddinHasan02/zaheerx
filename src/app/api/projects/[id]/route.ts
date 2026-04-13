import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
        highlight: body.highlight,
        status: body.status,
        features: body.features,
        imageUrl: body.imageUrl,
        order: body.order,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    console.log("DELETE Project: Unauthorized attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    console.log(`DELETE Project: Attempting to delete ID: ${id}`);
    const deleted = await prisma.project.delete({
      where: { id },
    });
    console.log(`DELETE Project: Successfully deleted ID: ${id}`);
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error(`DELETE Project: Error deleting ID:`, error);
    return NextResponse.json({ error: error.message || "Failed to delete project" }, { status: 500 });
  }
}
