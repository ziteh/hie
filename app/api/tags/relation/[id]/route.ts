import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  let parentId: number | undefined;
  let childId: number | undefined;
  try {
    const json = await request.json();
    parentId = json.parentId;
    childId = json.childId;

    console.debug("Received data:", { parentId, childId });
  } catch (error) {
    return NextResponse.json(
      { error: `Error parsing request body, ${error}` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  if (parentId === childId) {
    return NextResponse.json(
      { error: "Parent cannot be equal to Child" },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  try {
    if (parentId !== undefined) {
      const parentTag = await prisma.tag.findUnique({
        where: { id: parentId },
      });
      if (parentTag === null) {
        return NextResponse.json(
          { error: "Parent or child tag not found" },
          { status: StatusCodes.NOT_FOUND }
        );
      }
    }

    if (childId !== undefined) {
      const childTag = await prisma.tag.findUnique({
        where: { id: childId },
      });
      if (childTag === null) {
        return NextResponse.json(
          { error: "Parent or child tag not found" },
          { status: StatusCodes.NOT_FOUND }
        );
      }
    }

    const updated = await prisma.tagRelation.update({
      where: { id: Number(params.id) },
      data: { parentId, childId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error update tag relation:", error);
    return NextResponse.json(
      { error: "Error updating tag relation" },
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
    console.error("Error deleting tag relation:", error);
    return NextResponse.json(
      { error: "Error deleting tag relation" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
