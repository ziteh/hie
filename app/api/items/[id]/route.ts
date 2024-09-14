import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const includeFolder = url.searchParams.get("include") === "folder";

  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(params.id) },
      include: { folder: includeFolder },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching item" }, { status: 500 });
  }
}
