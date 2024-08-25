import { NextResponse } from "next/server";
import { prisma } from "@/src/db/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(request.url);
  const paramString = url.searchParams.get("include") || "";
  const paramsInclude = paramString.split(",");
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: Number(params.id) },
      include: {
        children: paramsInclude.includes("children"),
        parent: paramsInclude.includes("parent"),
        items: paramsInclude.includes("items"),
      },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tag" }, { status: 500 });
  }
}
