"use client";

import { Button } from "@mui/material";
import { updateTag } from "@/src/tags";
import { TagType } from "@/src/db/types";

export default function CreateTagButton() {
  return (
    <Button
      onClick={() => {
        updateTag(1, "Test222", TagType.Normal);
      }}
    >
      Update Tag
    </Button>
  );
}
