"use client";

import React from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Bar() {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <Topbar onClick={() => setOpen(!open)} />
      {(isDesktop || open) && <Sidebar open={open} />}
    </div>
  );
}
