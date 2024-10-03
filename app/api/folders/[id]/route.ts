import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

// Delete a folder
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.folder.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting folder:", error);
    return NextResponse.json(
      { error: "Error deleting folder" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Update a folder
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  let name: string | undefined;
  let path: string | undefined;
  try {
    const json = await request.json();
    name = json.name;
    let rawPath = json.path;

    if (rawPath === undefined) {
      path = undefined;
    } else {
      // Normalization
      path = rawPath.replace(/\\/g, "/").trim(); // Replace backslashes with forward
      if (path !== undefined && !path.endsWith("/")) {
        path += "/"; // Always add trailing slash
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Error parsing request body, ${error}` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  try {
    const updated = await prisma.folder.update({
      where: { id: Number(params.id) },
      data: { name, path },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error update folder:", error);
    return NextResponse.json(
      { error: "Error deleting folder" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Get a folder
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const includeItems = url.searchParams.get("include") === "items";

  try {
    const list = await prisma.folder.findMany({
      where: { id: Number(params.id) },
      include: { items: includeItems },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json(
      { error: "Error fetching folders" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
