import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imagePath = url.searchParams.get("path");
  if (imagePath === null) {
    return;
  }

  const fileName = path.basename(imagePath);
  const contentType = "image/png";

  try {
    const imageBuffer = await fs.promises.readFile(imagePath);

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename=${fileName}`,
      },
    });
  } catch (error) {
    return new NextResponse("File not found", {
      status: StatusCodes.NOT_FOUND,
    });
  }
}
