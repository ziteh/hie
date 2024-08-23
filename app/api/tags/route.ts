import { NextResponse } from "next/server";
import { prisma } from "@/src/prisma";

export async function POST(request: Request) {
  try {
    const { name, type, star, backColor, textColor } = await request.json();
    console.log("Received data:", { name, type, star, backColor, textColor });

    const tag = await prisma.tag.create({
      data: { name, type, star, backColor, textColor },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({ error: "Error creating tag" }, { status: 500 });
  }
}
