import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";
import { TagType } from "@/app/lib/types";

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
  let name: string | undefined;
  let type: string | undefined;
  let starred: boolean | undefined;
  let backColor: string | undefined;
  let textColor: string | undefined;
  try {
    const json = await request.json();
    name = json.name;
    type = json.type;
    starred = json.starred;
    backColor = json.backColor;
    textColor = json.textColor;

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

    console.debug("Received data:", {
      name,
      type,
      starred,
      backColor,
      textColor,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Error parsing request body, ${error}` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  try {
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
