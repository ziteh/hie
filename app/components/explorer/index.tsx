"use client";

import React from "react";
import { useTagTreeState } from "@/app/store/tagTree";
import ImageLoader from "./imageLoader";

export default function Explorer() {
  const subscribeSelected = useTagTreeState((s) => s.subscribeSelected);
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    subscribeSelected(onSelected);
  }, []);

  const onSelected = (id: number) => {
    setId(id);
  };

  return (
    <div>
      {id}

      <ImageLoader path="C:/Users/wk415/Pictures/Z-Hex Logo_V 2.2(Fin_W)-04.png" />
    </div>
  );
}
