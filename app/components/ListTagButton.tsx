"use client";

import { Button } from "@mui/material";
import { listTag } from "@/src/tags";
import { TagType } from "@/src/db/types";

export default function CreateTagButton() {
  return (
    <Button
      onClick={() => {
        listTag();
      }}
    >
      List Tag
    </Button>
  );
}
