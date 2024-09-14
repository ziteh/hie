import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function POST(request: Request) {
  try {
    const { name, path } = await request.json();
    console.debug("Received data:", { name, path });

    // Normalization
    let fmtPath = path.replace(/\\/g, "/"); // Replace backslashes with forward
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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const deleted = await prisma.folder.delete({
      where: { id },
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

export async function PATCH(request: Request) {
  try {
    const { id, name, path } = await request.json();

    // Normalization
    let fmtPath = path.replace(/\\/g, "/"); // Replace backslashes with forward
    if (!fmtPath.endsWith("/")) {
      fmtPath += "/"; // Always add trailing slash
    }

    const updated = await prisma.folder.update({
      where: { id },
      data: { name, path: fmtPath },
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const includeItems = url.searchParams.get("include") === "items";

  try {
    const list = await prisma.folder.findMany({
      include: { items: includeItems },
    });
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching folders" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
