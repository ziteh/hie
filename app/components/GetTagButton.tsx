"use client";

import { Button } from "@mui/material";
import { getTag } from "@/src/tags";
import { TagType } from "@/src/db/types";

export default function CreateTagButton() {
  return (
    <Button
      onClick={() => {
        getTag(1);
      }}
    >
      Get Tag
    </Button>
  );
}
