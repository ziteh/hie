import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const defaultWidth = 200;
const defaultHeight = 200;
const defaultQuality = 80;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imagePath = url.searchParams.get("path");
  if (!imagePath) {
    return new NextResponse("Image path is required", {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  // Check if the image file exists
  try {
    await fs.access(imagePath);
  } catch (error) {
    return new NextResponse("File not found", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  const width = url.searchParams.get("width");
  const height = url.searchParams.get("height");
  const quality = parseParam(
    url.searchParams.get("quality"),
    defaultQuality,
    1,
    100
  );

  const fileName = path.basename(imagePath);

  try {
    const imageSharp = sharp(imagePath).webp({ quality });
    let imageBuffer: Buffer;
    if (width && height) {
      imageBuffer = await imageSharp
        .resize({ width: Number(width), height: Number(height) })
        .toBuffer();
    } else {
      imageBuffer = await imageSharp.toBuffer();
    }

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Content-Disposition": `attachment; filename=${fileName}.webp`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return new NextResponse("Error processing image", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

const parseParam = (
  param: string | null,
  defaultValue: number,
  min?: number,
  max?: number
) => {
  const value = Number(param);

  if (param === null || isNaN(value)) return defaultValue;
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
};
