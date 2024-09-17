"use client";

import { useState, useEffect } from "react";
import ItemGrid from "./itemGrid";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { Tag, TagRelationChain, SimpleTag } from "@/app/lib/types";
import { getTag } from "@/app/lib/tags";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTagTreeState } from "@/app/store/tagTree";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { tag: string } }) {
  const [children, setChildren] = useState<SimpleTag[]>([]);
  const { updateSelectedTagId } = useTagTreeState();

  const router = useRouter();

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

  const onChildClick = (id: number) => {
    updateSelectedTagId(id);
    router.push(`/explorer/${id}`);
  };

  return (
    <div>
      {children.map((c, i) => (
        <Button
          key={i}
          startIcon={<LocalOfferIcon />}
          // href={`/explorer/${c.id}`}
          onClick={() => onChildClick(c.id)}
        >
          {c.name}
        </Button>
      ))}
      <ItemGrid tagId={Number(params.tag)} />
    </div>
  );
}
