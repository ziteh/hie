"use client";

import { Button } from "@mui/material";
import { createTag } from "@/src/tags";
import { TagType } from "@/src/db/types";

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
