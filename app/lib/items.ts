import { Item } from "@/app/lib/db/types";

const apiUrl = "/api/items";

export async function createItem(
  path: string,
  folderId: number,
  name?: string,
  starred?: boolean
): Promise<Item | null> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        folderId,
        name,
        starred,
      }),
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

    const data = await response.json();
    console.debug("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

export async function updateItem(
  id: number,
  path: string,
  name?: string,
  starred?: boolean
) {
  try {
    const response = await fetch(apiUrl + `/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: path,
        name: name,
        starred: starred,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Item update:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function getItem(
  id: number,
  includeFolder: boolean
): Promise<Item | null> {
  let url = `${apiUrl}/${id}`;
  if (includeFolder) {
    url += "?include=folder";
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Item = await response.json();
    console.debug("Item get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

export async function listItem(): Promise<Item[]> {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Item get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return [];
  }
}

export async function removeItem(id: number): Promise<void> {
  try {
    const response = await fetch(apiUrl + `/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Item deleted:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}
