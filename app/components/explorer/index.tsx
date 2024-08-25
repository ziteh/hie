"use client";

import React from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";
import { getTag } from "@/src/tags";
import { getItem } from "@/src/items";

export default function Explorer() {
  const subscribeSelected = useTagTreeState((s) => s.subscribeSelected);
  const [id, setId] = React.useState(0);
  const [img, setImg] = React.useState("");

  React.useEffect(() => {
    subscribeSelected(onSelected);
  }, []);

  const onSelected = async (id: number) => {
    setId(id);
    const tag = await getTag(id, true, true, true);
    if (tag === null) return;
    if (!tag.items) return;
    try {
      const item = await getItem(tag.items[0].itemId);
      if (item === null) return;

      console.log(item.path);
      setImg(item.path);
    } catch (err) {}
  };

  return (
    <div>
      {id}

      <ImageLoader path={img} />
    </div>
  );
}
