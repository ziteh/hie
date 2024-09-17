import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";
import { StatusCodes } from "http-status-codes";
import { Tag, TagParents, SimpleTag } from "@/app/lib/db/types";
import { TagRelation } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const selfSimpleTag = await getSimpleTag(Number(params.id));

    const tag = await prisma.tag.findUnique({
      where: { id: Number(params.id) },
      include: { parent: true, children: true },
    });

    if (!tag) {
      return NextResponse.json(
        { error: "Tag not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const childrenTags = await Promise.all(
      tag.children.map(async (c) => await getSimpleTag(c.childId))
    );

    let parents = await getParentTags(Number(params.id));
    parents.reverse();

    const tp: TagParents = {
      self: selfSimpleTag,
      parents,
      children: childrenTags,
    };
    return NextResponse.json(tp);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tag" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}

async function getSimpleTag(id: number): Promise<SimpleTag> {
  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  if (!tag) {
    throw new Error("Tag not found");
  }

  const simpleTag: SimpleTag = {
    id: tag.id,
    name: tag.name,
  };

  return simpleTag;
}

async function getParentTags(id: number, parents: SimpleTag[] = []) {
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

  if (!pTag || !pTag.id) {
    return parents;
  }

  const pTagSimple = await getSimpleTag(pTag.id);
  parents.push(pTagSimple);
  return getParentTags(parentId, parents);
}
