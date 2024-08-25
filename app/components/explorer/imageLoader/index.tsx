"use client";

import { useState, useEffect } from "react";
import { loadImage } from "@/app/lib/imageLoader";
import { Skeleton } from "@mui/material";

interface Props {
  path: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function ImageLoader(props: Props) {
  const { path, alt, width, height } = props;
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    loadImage(path).then((url) => {
      if (url !== null) {
        setImageSrc(url);
      }
    });
  }, [path]);

  return (
    <div>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
        />
      ) : (
        <Skeleton width={width} height={height} />
      )}
    </div>
  );
}
