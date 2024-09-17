"use client";

import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <Topbar
        isDesktop={isDesktop}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
      {(isDesktop || sidebarOpen) && <Sidebar />}
    </div>
  );
}
