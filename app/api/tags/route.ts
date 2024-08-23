import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";

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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Tag ID is required" },
        { status: 400 }
      );
    }

    // Delete the tag with the specified ID
    const deletedTag = await prisma.tag.delete({
      where: { id },
    });

    return NextResponse.json(deletedTag);
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json({ error: "Error deleting tag" }, { status: 500 });
  }
}
