"use client";

import { Button } from "@mui/material";
import { createTag } from "@/app/lib/tags";
import { TagType } from "@/app/lib/db/types";

export default function CreateTagButton() {
  return (
    <Button
      onClick={() => {
        createTag("Test", TagType.Normal);
      }}
    >
      Create Tag
    </Button>
  );
}
