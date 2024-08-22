"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl("/api/image");
  }, []);

  return (
    <div>
      <h1>Image Display</h1>
      {imageUrl && <Image src={imageUrl} width={500} height={500} alt={""} />}
    </div>
  );
}
