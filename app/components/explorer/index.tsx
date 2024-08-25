"use client";

import React from "react";
import { useTagTreeState } from "@/app/store/tagTree";

export default function Explorer() {
  const subscribeSelected = useTagTreeState((s) => s.subscribeSelected);
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    subscribeSelected(onSelected);
  }, []);

  const onSelected = (id: number) => {
    setId(id);
  };

  return <div>{id}</div>;
}
