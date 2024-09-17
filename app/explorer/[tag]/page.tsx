"use client";

import { useState, useEffect } from "react";
import Explorer from "@/app/components/explorer";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { Tag, TagRelationChain, SimpleTag } from "@/app/lib/types";
import { getTag } from "@/app/lib/tags";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTagTreeState } from "@/app/store/tagTree";

export default function Page({ params }: { params: { tag: string } }) {
  const [children, setChildren] = useState<SimpleTag[]>([]);
  const { updateSelectedTagId } = useTagTreeState();

  useEffect(() => {
    updateTag();
  }, []);

  const updateTag = async () => {
    const response = await fetch(`/api/tags/${params.tag}/parents`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return;
    }

    const data: TagRelationChain = await response.json();
    setChildren(data.children);
  };

  return (
    <div>
      {children.map((c, i) => (
        <Button
          key={i}
          startIcon={<LocalOfferIcon />}
          href={`/explorer/${c.id}`}
        >
          {c.name}
        </Button>
      ))}
      <Explorer tagId={Number(params.tag)} />
    </div>
  );
}
