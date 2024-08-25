"use client";

import React from "react";
import FormDialog from "./FormDialog";
import { Button } from "@mui/material";

export default function TagButton() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Tag</Button>
      <FormDialog open={open} onClose={handleClose} />
    </div>
  );
}
