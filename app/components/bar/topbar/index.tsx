"use client";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";

interface Props {
  onClick?: () => void;
}

export default function Topbar(props: Props) {
  const { onClick } = props;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton onClick={onClick}>
          <DehazeIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Top Bar
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
