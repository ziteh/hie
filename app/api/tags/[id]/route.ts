import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

// Get a tag
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const paramString = url.searchParams.get("include") || "";
  const paramsInclude = paramString.split(",");

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: Number(params.id) },
      include: {
        children: paramsInclude.includes("children"),
        parent: paramsInclude.includes("parent"),
        items: paramsInclude.includes("items"),
      },
    });

    if (!tag) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Delete a tag
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Delete the tag with the specified ID
    const deletedTag = await prisma.tag.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deletedTag);
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json(
      { error: "Error deleting tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Update a tag
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, type, starred, backColor, textColor } = await request.json();

    const tag = await prisma.tag.update({
      where: { id: Number(params.id) },
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
    return NextResponse.json(
      { error: "Error updating tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
