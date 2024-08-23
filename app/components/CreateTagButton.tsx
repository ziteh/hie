"use client";

import { Button } from "@mui/material";

export default function CreateTagButton() {
  const createTag = async () => {
    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New Tag",
          type: "CATEGORY",
          star: false,
          backColor: "#FF0000",
          textColor: "#FFFFFF",
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
  };

  return <Button onClick={createTag}>Create Tag</Button>;
}
