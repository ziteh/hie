import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function POST(request: Request) {
  try {
    const { parentId, childId } = await request.json();
    console.debug("Received data:", { parentId, childId });

    if (parentId === childId) {
      return NextResponse.json(
        { error: "Parent cannot be equal to Child" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const created = await prisma.tagRelation.create({
      data: { parentId, childId },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating tag relation:", error);
    return NextResponse.json(
      { error: "Error creating tag relation" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, parentId, childId } = await request.json();

    if (parentId === childId) {
      return NextResponse.json(
        { error: "Parent cannot be equal to Child" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const updated = await prisma.tagRelation.update({
      where: { id },
      data: { parentId, childId },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error update tag relation:", error);
    return NextResponse.json(
      { error: "Error updating tag relation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const relations = await prisma.tagRelation.findMany();
    return NextResponse.json(relations);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tag relations" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await prisma.tagRelation.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json({ error: "Error deleting tag" }, { status: 500 });
  }
}
