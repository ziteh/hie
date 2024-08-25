"use client";

import { useState, useEffect } from "react";

interface Props {
  path: string;
}

export default function ImageLoader(props: Props) {
  const { path } = props;
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (path) {
      fetch(`/api/image?path=${encodeURIComponent(path)}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        })
        .catch((error) => console.error("Error loading image:", error));
    }
  }, [path]);

  return (
    <div>
      {imageSrc ? <img src={imageSrc} alt={"img"} /> : <p>No image selected</p>}
    </div>
  );
}
