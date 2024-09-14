"use client";

import { useState, useEffect } from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";
import { getTag } from "@/app/lib/tags";
import { getItem } from "@/app/lib/items";
import { Item } from "@/app/lib/db/types";
import {
  Backdrop,
  Button,
  Dialog,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { getFolder } from "@/app/lib/folders";

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
          const item = await getItem(id, true);
          return item;
        })
      );

      const paths = items.map((i) => {
        if (i && i.folder) {
          return `${i.folder.path}${i.path}`;
        }
      });
      setImagePaths(paths);
    } catch (err) {}
  };

  return (
    <div>
      <ImageList cols={4} gap={6}>
        {imagePaths.map((path, index) => (
          <ImageListItem key={index}>
            <Button variant="text" onClick={() => handleOpen(path)}>
              <ImageLoader path={path} width={size} height={size} />
            </Button>
          </ImageListItem>
        ))}
      </ImageList>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <ImageLoader
          path={selectedImagePath}
          // width={size}
          // height={size}
          quality={100}
        />
      </Backdrop>
    </div>
  );
}
