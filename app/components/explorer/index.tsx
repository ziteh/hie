"use client";

import { useState, useEffect } from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";
import { getTag } from "@/app/lib/tags";
import { getItem } from "@/app/lib/items";
import { Item } from "@/app/lib/db/types";
import { ImageList, ImageListItem } from "@mui/material";

export default function Explorer() {
  const subscribeSelected = useTagTreeState((s) => s.subscribeSelected);
  const [id, setId] = useState(0);
  const [img, setImg] = useState<string[]>([]);

  useEffect(() => {
    subscribeSelected(onSelected);
  }, []);

  const onSelected = async (id: number) => {
    setId(id);
    const tag = await getTag(id, true, true, true);
    if (tag === null) return;
    if (!tag.items) return;

    const itemIds = tag.items.map((i) => i.itemId);
    try {
      let items: (Item | null)[] = await Promise.all(
        itemIds.map(async (id) => {
          const item = await getItem(id);
          return item;
        })
      );

      items = items.filter((item) => item !== null);
      console.log(items);

      const paths = items.map((i) => i!.path);
      console.log(paths);
      setImg(paths);
    } catch (err) {}
  };

  return (
    <div>
      {img.map((p) => (
        <ImageLoader path={p} />
      ))}
    </div>
  );
}
