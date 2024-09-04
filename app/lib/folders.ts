import { Folder } from "@/app/lib/db/types";

const apiUrl = "http://localhost:3140/api/folders"; // TODO

export async function createFolder(
  name: string,
  path: string
): Promise<Folder | null> {
  path = path.replace(/\\/g, "/"); // Replace backslashes with forward
  if (!path.endsWith("/")) {
    path += "/"; // Always add trailing slash
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, path }),
    });

    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
      return null;
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType?.includes("application/json")) {
      console.error("Expected JSON, got:", contentType);
      return null;
    }

    const data: Folder = await response.json();
    console.debug("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

export async function updateFolder(id: number, name: string, path: string) {
  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, path }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Folder update:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function getFolder(
  id: number,
  includeItems: boolean
): Promise<Folder | null> {
  let params: string = "";
  if (includeItems) {
    params = "items";
  }
  const url = `${apiUrl}/${id}?include=${params}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Folder = await response.json();
    console.debug("Folder get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

export async function listTag(includeItems: boolean): Promise<Folder[]> {
  let params: string = "";
  if (includeItems) {
    params = "items";
  }
  const url = `${apiUrl}?include=${params}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Folder[] = await response.json();
    console.debug("Folder get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return [];
  }
}

export async function removeFolder(id: number): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Folder deleted:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}
