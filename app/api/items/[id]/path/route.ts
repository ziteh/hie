import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(params.id) },
      include: { folder: true },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const fullPath = `${item.folder.path}${item.path}`;
    return NextResponse.json({ fullPath });
  } catch (error) {
    console.error("Error fetching item:", error);
    return NextResponse.json(
      { error: "Error fetching item" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
