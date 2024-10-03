import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

// Create a new item
export async function POST(request: Request) {
  let path: string;
  let folderId: number;
  let name: string;
  let starred: boolean;
  try {
    const json = await request.json();
    let rawPath = json.path;
    folderId = json.folderId;
    name = json.name;
    starred = json.starred;

    // Normalization
    path = rawPath.replace(/\\/g, "/").trim(); // Replace backslashes with forward
  } catch (error) {
    return NextResponse.json(
      { error: `Error parsing request body, ${error}` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  try {
    const item = await prisma.item.create({
      data: { path, folderId, name, starred },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Error creating item" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Get all items
export async function GET(request: Request) {
  const url = new URL(request.url);
  const includeFolder = url.searchParams.get("include") === "folder";

  try {
    const items = await prisma.item.findMany({
      include: {
        folder: includeFolder,
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { error: "Error fetching items" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
