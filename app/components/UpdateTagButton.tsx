"use client";

import { Button } from "@mui/material";
import { updateTag } from "@/app/lib/tags";
import { TagType } from "@/app/lib/db/types";

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
