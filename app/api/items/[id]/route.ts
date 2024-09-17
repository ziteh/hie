import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

// Get an item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const includeFolder = url.searchParams.get("include") === "folder";

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(params.id) },
      include: { folder: includeFolder },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Error fetching item" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Delete an item
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.item.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Error deleting item" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Update an item
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { folderId, path, name, starred } = await request.json();

    // Normalization
    const fmtPath = path.replace(/\\/g, "/"); // Replace backslashes with forward

    const item = await prisma.item.update({
      where: { id: Number(params.id) },
      data: { path: fmtPath, folderId, name, starred },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error update item:", error);
    return NextResponse.json(
      { error: "Error deleting item" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
