const apiUrl = "/api/items/relation";

export async function createItemRelation(
  tagId: number,
  itemId: number
): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagId, itemId }),
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

export async function updateItemRelation(
  id: number,
  tagId: number,
  itemId: number
) {
  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        tagId,
        itemId,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Item relation update:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function getTagRelation(id: number) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Item relation get:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function listTagRelation() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.debug("Item relation get:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}

export async function removeTagRelation(id: number): Promise<void> {
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
    console.debug("Item relation deleted:", data);
  } catch (error) {
    console.error("Error during fetch:", error);
  }
}
