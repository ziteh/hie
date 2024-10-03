import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { tagId, itemId } = await request.json();

    if (tagId !== undefined) {
      const tag = await prisma.tag.findUnique({
        where: { id: tagId },
      });
      if (tag === null) {
        return NextResponse.json(
          { error: "Tag not found" },
          { status: StatusCodes.NOT_FOUND }
        );
      }
    }

    if (itemId !== undefined) {
      const item = await prisma.item.findUnique({
        where: { id: itemId },
      });
      if (item === null) {
        return NextResponse.json(
          { error: "Item not found" },
          { status: StatusCodes.NOT_FOUND }
        );
      }
    }

    const updated = await prisma.itemRelation.update({
      where: { id: Number(params.id) },
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

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.tagRelation.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting item relation:", error);
    return NextResponse.json(
      { error: "Error deleting item relation" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
