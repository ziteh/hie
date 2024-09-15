import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";
import { StatusCodes } from "http-status-codes";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    let parents = await getParentTags(Number(params.id));
    parents.reverse();

    return NextResponse.json({
      parents,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getParentTags(id: number, parents: string[] = []) {
  const tag = await prisma.tag.findUnique({
    where: { id },
    include: { parent: true },
  });

  if (!tag || !tag.parent) {
    return parents;
  }

  const parentId = tag.parent.parentId;

  const pTag = await prisma.tag.findUnique({
    where: { id: parentId },
    include: { parent: true },
  });

  parents.push(pTag?.name as string);
  return getParentTags(parentId, parents);
}
