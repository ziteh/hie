import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function POST(request: Request) {
  try {
    const { name, path } = await request.json();
    console.debug("Received data:", { name, path });

    const created = await prisma.path.create({
      data: { name, path },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating path", error);
    return NextResponse.json(
      { error: "Error creating path" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, name, path } = await request.json();

    const updated = await prisma.path.update({
      where: { id },
      data: { name, path },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error update path:", error);
    return NextResponse.json(
      { error: "Error deleting path" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET() {
  try {
    const list = await prisma.path.findMany();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching paths" },
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

    const deleted = await prisma.path.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting path:", error);
    return NextResponse.json(
      { error: "Error deleting path" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
