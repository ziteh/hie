import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const { path, folderId, name, starred } = await request.json();
    console.debug("Received data:", { path, name, starred });

    const item = await prisma.item.create({
      data: { path, folderId, name, starred },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json({ error: "Error creating item" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const {
      id,
      basePathId: folderId,
      path,
      name,
      starred,
    } = await request.json();

    const item = await prisma.item.update({
      where: { id },
      data: { path, folderId, name, starred },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error update item:", error);
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching items" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
  }
}
