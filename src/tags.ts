import { TagType } from "@/src/db/types";

const apiUrl = "/api/tags";

export async function createTag(
  name: string,
  type: TagType,
  star?: boolean,
  textColor?: string,
  backColor?: string
): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        type: type,
        star: star,
        backColor: backColor,
        textColor: textColor,
      }),
    });

    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
      return;
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType?.includes("application/json")) {
      console.error("Expected JSON, got:", contentType);
      return;
    }

    const data = await response.json();
    console.debug("Response data:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function removeTag(tagId: number): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tagId }),
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
  star?: boolean,
  backColor?: string,
  textColor?: string
) {
  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: tagId,
        name: name,
        type: type,
        star: star,
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

export async function getTag(tagId: number) {
  try {
    const response = await fetch(`${apiUrl}/${tagId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Tag get:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function listTag() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Tag get:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}
