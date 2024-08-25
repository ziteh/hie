"use client";

import { Button } from "@mui/material";
import { listTag } from "@/app/lib/tags";
import { TagType } from "@/app/lib/db/types";

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
