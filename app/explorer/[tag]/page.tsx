"use client";

import { useState, useEffect } from "react";
import Explorer from "@/app/components/explorer";
import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { Tag, TagParents, SimpleTag } from "@/app/lib/db/types";
import { getTag } from "@/app/lib/tags";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

export default function Page({ params }: { params: { tag: string } }) {
  const [tag, setTag] = useState<SimpleTag | null>(null);
  const [parents, setParents] = useState<SimpleTag[]>([]);
  const [children, setChildren] = useState<SimpleTag[]>([]);

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

    const data: TagParents = await response.json();
    setParents(data.parents);
    setChildren(data.children);
    setTag(data.self);
  };

  return (
    <div>
      <Breadcrumbs>
        <Link underline="none" color="inherit" href="/explorer">
          <HomeIcon fontSize="small" />
        </Link>
        {parents.map((p, i) => (
          <Link
            key={i}
            underline="hover"
            color="inherit"
            href={`/explorer/${p.id}`}
          >
            {p.name}
          </Link>
        ))}
        <Typography sx={{ color: "text.primary" }}>{tag?.name}</Typography>
      </Breadcrumbs>
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
