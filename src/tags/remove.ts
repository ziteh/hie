const apiUrl = "/api/tags";

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
