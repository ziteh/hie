import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const fallbackQuality = 80;
const bashPath = "/app/volume";

export async function GET(
  request: Request,
  { params }: { params: { path: string } }
) {
  const imagePath =
    process.env.NODE_ENV === "production"
      ? path.join(bashPath, params.path)
      : path.join(params.path);

  // Check if the image file exists
  try {
    await fs.access(imagePath);
  } catch (error) {
    return new NextResponse("File not found", {
      status: StatusCodes.NOT_FOUND,
    });
  }

  const url = new URL(request.url);
  let width = Number(url.searchParams.get("width")) || undefined;
  let height = Number(url.searchParams.get("height")) || undefined;
  const quality = parseParam(
    url.searchParams.get("quality"),
    Number(process.env.DEFAULT_IMG_QUALITY) || fallbackQuality,
    1,
    100
  );

  const fileName = path.basename(imagePath);

  try {
    const imageSharp = sharp(imagePath);
    const metadata = await imageSharp.metadata();

    width = clampSize(width, metadata.width);
    height = clampSize(height, metadata.height);

    const converted = imageSharp.webp({ quality });
    let imageBuffer: Buffer;
    if (width || height) {
      imageBuffer = await converted.resize({ width, height }).toBuffer();
    } else {
      imageBuffer = await converted.toBuffer();
    }

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Content-Disposition": `attachment; filename=${encodeURIComponent(fileName)}.webp`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return new NextResponse("Error processing image", {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

function clampSize(newSize?: number, oriSize?: number) {
  if (newSize !== undefined && oriSize !== undefined && newSize > oriSize) {
    return undefined;
  }
  return newSize;
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
