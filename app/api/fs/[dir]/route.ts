import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import path from "path";
import fs from "fs/promises";

export async function GET(
  _request: Request,
  { params }: { params: { dir: string } }
) {
  const dirPath = path.resolve(params.dir);

  try {
    const files = await fs.readdir(dirPath);
    return NextResponse.json(files);
  } catch (err) {
    console.error("Error reading directory:", err);
    return NextResponse.json(
      { error: "Error reading directory" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
