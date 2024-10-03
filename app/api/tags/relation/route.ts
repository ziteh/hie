import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
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

    const parentTag = await prisma.tag.findUnique({
      where: { id: parentId },
    });
    if (parentTag === null) {
      return NextResponse.json(
        { error: "Parent tag not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const childTag = await prisma.tag.findUnique({
      where: { id: childId },
    });
    if (childTag === null) {
      return NextResponse.json(
        { error: "Child tag not found" },
        { status: StatusCodes.NOT_FOUND }
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
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  try {
    const relations = await prisma.tagRelation.findMany();
    return NextResponse.json(relations);
  } catch (error) {
    console.error("Error fetching tag relations:", error);
    return NextResponse.json(
      { error: "Error fetching tag relations" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
