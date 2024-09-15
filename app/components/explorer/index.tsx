"use client";

import { useState, useEffect } from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";
import { getTag } from "@/app/lib/tags";
import { Backdrop, Button, ImageList, ImageListItem } from "@mui/material";
import Showcase from "./showcase";

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

  const getImageUrl = (path: string, quality: number, width?: number) => {
    let url = `/api/image/${encodeURIComponent(path)}?quality=${quality}`;
    if (width !== undefined) {
      url += `&width=${width}`;
    }
    return url;
  };

  return (
    <div>
      <ImageList cols={4} gap={1}>
        {imagePaths.map((path, index) => (
          <ImageListItem key={index}>
            <Button variant="text" onClick={() => handleOpen(path)}>
              <img
                src={getImageUrl(path, 80)}
                srcSet={
                  getImageUrl(path, 80, 100) +
                  " 100w, " +
                  getImageUrl(path, 80, 300) +
                  " 300w, " +
                  getImageUrl(path, 80, 500) +
                  " 500w, " +
                  getImageUrl(path, 80, 1200) +
                  " 1200w"
                }
                sizes="18vw"
                alt="?"
                // width={size}
                // height={size}
                loading="lazy"
                style={{
                  // maxWidth: "100%",
                  // maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Button>
          </ImageListItem>
        ))}
      </ImageList>
      <Showcase
        imgSrc={getImageUrl(selectedImagePath, 100)}
        open={open}
        onClick={handleClose}
      />
    </div>
  );
}
