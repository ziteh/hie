"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { Tag, TagRelationChain, SimpleTag } from "@/app/lib/types";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTagTreeState } from "@/app/store/tagTree";
import { useRouter } from "next/navigation";

export default function Page() {
  const [rootTags, setRootTags] = useState<Tag[]>([]);
  const { updateSelectedTagId } = useTagTreeState();

  const router = useRouter();

  useEffect(() => {
    updateTag();
  }, []);

  const updateTag = async () => {
    const response = await fetch(`/api/tags/root`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return;
    }

    const data: Tag[] = await response.json();
    setRootTags(data);
  };

  const onChildClick = (id: number) => {
    updateSelectedTagId(id);
    router.push(`/explorer/${id}`);
  };

  return (
    <div>
      {rootTags.map((c, i) => (
        <Button
          key={i}
          startIcon={<LocalOfferIcon />}
          onClick={() => onChildClick(c.id)}
        >
          {c.name}
        </Button>
      ))}
    </div>
  );
}
