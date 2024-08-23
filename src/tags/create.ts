import { TagType } from "@/src/db/types";

const apiUrl = "/api/tags";

export async function createTag(
  name: string,
  type: TagType,
  star?: boolean,
  backColor?: string,
  textColor?: string
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
