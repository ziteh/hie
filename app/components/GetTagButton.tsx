"use client";

import { Button } from "@mui/material";
import { getTag } from "@/app/lib/tags";
import { TagType } from "@/app/lib/db/types";

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
