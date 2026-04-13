import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the incoming data
    const validation = contactSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = validation.data;

    // Save the enquiry to the database
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
