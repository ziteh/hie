import { FileStructure } from "@/app/lib/types";

const apiUrl = "/api/fs";

export async function getFileStructure(
  path: string
): Promise<FileStructure | null> {
  if (path === "") return null;

  const encodedPath = encodeURIComponent(path);
  const url = `${apiUrl}/${encodedPath}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: FileStructure = await response.json();
    console.debug("Filesystem get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}
