const apiUrl = "/api/image/";

export async function loadImage(
  path: string,
  width?: number,
  height?: number,
  quality?: number
): Promise<string | null> {
  if (!path) return null;

  let url = apiUrl + encodeURIComponent(path);

  if (quality || width || height) {
    url += "?";

    if (quality) {
      url += `&quality=${quality}`;
    }
    if (width) {
      url += `&width=${width}`;
    }
    if (height) {
      url += `&height=${height}`;
    }
  }

  try {
    const response = await fetch(url);
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
