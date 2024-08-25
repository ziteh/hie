"use client";

import { useState, useEffect } from "react";
import { loadImage } from "@/app/lib/imageLoader";

interface Props {
  path: string;
}

export default function ImageLoader(props: Props) {
  const { path } = props;
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
          alt={"img"}
          loading="lazy"
        />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
}
