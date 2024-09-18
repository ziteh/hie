import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";
import { TagType } from "@/app/lib/types";

// Create a new tag
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
    return NextResponse.json(
      { error: "Error creating tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Get all tags
export async function GET(request: Request) {
  const url = new URL(request.url);
  const paramString = url.searchParams.get("include") || "";
  const params = paramString.split(",");

  const type = url.searchParams.get("type") || undefined;

  if (
    type !== undefined &&
    type !== TagType.Normal &&
    type !== TagType.Category
  ) {
    return NextResponse.json(
      { error: "Invalid tag type" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  try {
    const tags = await prisma.tag.findMany({
      where: { type },
      include: {
        children: params.includes("children"),
        parent: params.includes("parent"),
        items: params.includes("items"),
      },
    });
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Error fetching tags" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
