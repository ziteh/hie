"use client";

import { useState, useEffect } from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";
import { getTag } from "@/app/lib/tags";
import { getItem } from "@/app/lib/items";
import { Item } from "@/app/lib/db/types";
import {
  Button,
  Dialog,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const size = 250;

export default function Explorer() {
  const subscribeSelected = useTagTreeState((s) => s.subscribeSelected);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (path: string) => {
    setSelectedImagePath(path);
    setOpen(true);
  };

  useEffect(() => {
    subscribeSelected(onSelected);
  }, []);

  const onSelected = async (id: number) => {
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
      const paths = items.map((i) => i!.path);
      setImagePaths(paths);
    } catch (err) {}
  };

  return (
    <div>
      <ImageList cols={4} gap={6}>
        {imagePaths.map((path, index) => (
          <ImageListItem key={index}>
            <Button onClick={() => handleOpen(path)}>
              <ImageLoader path={path} width={size} height={size} />
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog open={open} onClose={handleClose}>
        <Button onClick={handleClose}>Close</Button>
        <ImageLoader
          path={selectedImagePath}
          // width={size}
          // height={size}
          quality={100}
        />
      </Dialog>
    </div>
  );
}
