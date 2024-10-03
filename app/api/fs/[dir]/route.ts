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
    const items = await fs.readdir(dirPath);
    const result: { files: string[]; dir: string[] } = {
      files: [],
      dir: [],
    };

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = await fs.lstat(itemPath);

      if (stat.isDirectory()) {
        result.dir.push(item);
      } else if (stat.isFile()) {
        result.files.push(item);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json(
      { error: "Error reading directory" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
