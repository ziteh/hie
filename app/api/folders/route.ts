import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

// Create a folder
export async function POST(request: Request) {
  let name: string;
  let path: string;
  try {
    const json = await request.json();
    name = json.name;

    // Normalization
    path = json.path.replace(/\\/g, "/").trim(); // Replace backslashes with forward
    if (!path.endsWith("/")) {
      path += "/"; // Always add trailing slash
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Error parsing request body, ${error}` },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  try {
    const created = await prisma.folder.create({
      data: { name, path },
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
