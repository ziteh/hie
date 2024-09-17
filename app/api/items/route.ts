import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";
import { StatusCodes } from "http-status-codes";

// Create a new item
export async function POST(request: Request) {
  try {
    const { path, folderId, name, starred } = await request.json();
    console.debug("Received data:", { path, name, starred });

    // Normalization
    const fmtPath = path.replace(/\\/g, "/").trim(); // Replace backslashes with forward

    const item = await prisma.item.create({
      data: { path: fmtPath, folderId, name, starred },
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
    return NextResponse.json(
      { error: "Error fetching items" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
