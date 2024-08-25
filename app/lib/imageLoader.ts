const apiUrl = "http://localhost:3140/api/image?path="; // TODO

export async function loadImage(path: string): Promise<string | null> {
  if (!path) return null;

  try {
    const response = await fetch(apiUrl + encodeURIComponent(path));
    if (!response.ok) {
      // throw new Error("Network response was not ok");
      return null;
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error loading image:", error);
    return null;
  }
}
