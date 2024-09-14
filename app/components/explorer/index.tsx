"use client";

import { useState, useEffect } from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";
import { getTag } from "@/app/lib/tags";
import { Backdrop, Button, ImageList, ImageListItem } from "@mui/material";

const size = 250;

export default function Explorer() {
  const subscribeSelected = useTagTreeState((s) => s.subscribeSelected);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string>("");

  useEffect(() => {
    subscribeSelected(onSelected);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (path: string) => {
    setSelectedImagePath(path);
    setOpen(true);
  };

  const getFullPath = async (id: number) => {
    const url = `/api/items/${id}/path`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data.fullPath) {
      return null;
    }
    return data.fullPath as string;
  };

  const onSelected = async (id: number) => {
    const tag = await getTag(id, true, true, true);
    if (tag === null || !tag.items) return;

    try {
      const paths = await Promise.all(
        tag.items.map((ir) => getFullPath(ir.itemId))
      );

      setImagePaths(paths.filter((p): p is string => !!p));
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
