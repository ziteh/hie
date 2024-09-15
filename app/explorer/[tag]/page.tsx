"use client";

import { useState, useEffect } from "react";
import Explorer from "@/app/components/explorer";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Tag } from "@/app/lib/db/types";
import { getTag } from "@/app/lib/tags";

export default function Page({ params }: { params: { tag: string } }) {
  const [tag, setTag] = useState<Tag | null>(null);
  const [parents, setParents] = useState<string[]>([]);

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

    const data = await response.json();
    setParents(data.parents);

    const tag = await getTag(Number(params.tag), false, false, false);
    setTag(tag);
  };

  return (
    <div>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/explorer">
          Root
        </Link>
        {parents.map((p, i) => (
          <Link
            key={i}
            underline="hover"
            color="inherit"
            href={`/explorer/${p}`}
          >
            {p}
          </Link>
        ))}
        <Typography sx={{ color: "text.primary" }}>{tag?.name}</Typography>
      </Breadcrumbs>
      <Explorer tagId={Number(params.tag)} />
    </div>
  );
}
