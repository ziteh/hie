import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";

export async function POST(request: Request) {
  try {
    const { name, type, starred, backColor, textColor } = await request.json();
    console.debug("Received data:", {
      name,
      type,
      starred,
      backColor,
      textColor,
    });

    const tag = await prisma.tag.create({
      data: { name, type, starred, backColor, textColor },
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

export async function PATCH(request: Request) {
  try {
    const { id, name, type, starred, backColor, textColor } =
      await request.json();

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name,
        type,
        starred,
        backColor,
        textColor,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error("Error update tag:", error);
    return NextResponse.json({ error: "Error deleting tag" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const paramString = url.searchParams.get("include") || "";
  const params = paramString.split(",");

  try {
    const tags = await prisma.tag.findMany({
      include: {
        children: params.includes("children"),
        parent: params.includes("parent"),
        items: params.includes("items"),
      },
    });
    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tags" }, { status: 500 });
  }
}
