import { TagType, Tag } from "@/app/lib/types";

const apiUrl = "/api/tags";

export async function createTag(
  name: string,
  type: TagType,
  starred?: boolean,
  textColor?: string,
  backColor?: string
): Promise<Tag | null> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        type: type,
        starred: starred,
        backColor: backColor,
        textColor: textColor,
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

export async function removeTag(tagId: number): Promise<void> {
  try {
    const response = await fetch(apiUrl + `/${tagId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Tag deleted:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function updateTag(
  tagId: number,
  name: string,
  type: TagType,
  starred?: boolean,
  backColor?: string,
  textColor?: string
) {
  try {
    const response = await fetch(apiUrl + `/${tagId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        type: type,
        starred: starred,
        backColor: backColor,
        textColor: textColor,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Tag update:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function getTag(
  id: number,
  includeChildren: boolean,
  includeParent: boolean,
  includeItems: boolean
): Promise<Tag | null> {
  let params: string[] = [];
  if (includeChildren) {
    params.push("children");
  }
  if (includeParent) {
    params.push("parent");
  }
  if (includeItems) {
    params.push("items");
  }
  const paramsString = params.join(",");
  const url = `${apiUrl}/${id}?include=${paramsString}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Tag = await response.json();
    console.debug("Tag get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return null;
  }
}

export async function listTag(
  type: TagType | null,
  includeChildren: boolean,
  includeParent: boolean,
  includeItems: boolean
): Promise<Tag[]> {
  let params: string[] = [];
  if (includeChildren) {
    params.push("children");
  }
  if (includeParent) {
    params.push("parent");
  }
  if (includeItems) {
    params.push("items");
  }
  const paramsString = params.join(",");

  let fmtType = "";
  if (type !== null) {
    fmtType = `type=${type}&`;
  }

  const url = `${apiUrl}?${fmtType}include=${paramsString}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Tag[] = await response.json();
    console.debug("Tag get:", data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error);
    return [];
  }
}
