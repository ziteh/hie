import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

export async function POST(request: Request) {
  try {
    const { tagId, itemId } = await request.json();
    console.debug("Received data:", { tagId, itemId });

    const tag = await prisma.tag.findUnique({
      where: { id: tagId },
    });
    if (tag === null) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });
    if (item === null) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const created = await prisma.itemRelation.create({
      data: { tagId, itemId },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating item relation:", error);
    return NextResponse.json(
      { error: "Error creating item relation" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  try {
    const relations = await prisma.itemRelation.findMany();
    return NextResponse.json(relations);
  } catch (error) {
    console.error("Error fetching item relations:", error);
    return NextResponse.json(
      { error: "Error fetching item relations" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
