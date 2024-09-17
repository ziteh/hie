import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function POST(request: Request) {
  try {
    const { tagId, itemId } = await request.json();
    console.debug("Received data:", { tagId, itemId });

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

export async function PATCH(request: Request) {
  try {
    const { id, tagId, itemId } = await request.json();

    const updated = await prisma.itemRelation.update({
      where: { id },
      data: { tagId, itemId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error update item relation:", error);
    return NextResponse.json(
      { error: "Error updating item relation" },
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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const deleted = await prisma.tagRelation.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json(
      { error: "Error deleting tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
