import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

// Create a folder
export async function POST(request: Request) {
  try {
    const { name, path } = await request.json();
    console.debug("Received data:", { name, path });

    // Normalization
    let fmtPath = path.replace(/\\/g, "/").trim(); // Replace backslashes with forward
    if (!fmtPath.endsWith("/")) {
      fmtPath += "/"; // Always add trailing slash
    }

    const created = await prisma.folder.create({
      data: { name, path: fmtPath },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating folder", error);
    return NextResponse.json(
      { error: "Error creating folder" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

// Get all folders
export async function GET(request: Request) {
  const url = new URL(request.url);
  const includeItems = url.searchParams.get("include") === "items";

  try {
    const list = await prisma.folder.findMany({
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
