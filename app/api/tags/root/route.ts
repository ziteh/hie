import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/config/prisma";
import { StatusCodes } from "http-status-codes";

export async function GET(_request: Request) {
  try {
    // Get all root tags (with no parent)
    const tags = await prisma.tag.findMany({
      where: { parent: null },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching root tags:", error);
    return NextResponse.json(
      { error: "Error fetching root tags" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
