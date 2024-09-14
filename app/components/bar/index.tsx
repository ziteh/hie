"use client";

import React from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function Bar() {
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Topbar onClick={() => setOpen(!open)} />
      <Sidebar open={open} />
    </div>
  );
}
