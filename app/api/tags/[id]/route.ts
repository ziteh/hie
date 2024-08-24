import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: Number(params.id) },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tag" }, { status: 500 });
  }
}
