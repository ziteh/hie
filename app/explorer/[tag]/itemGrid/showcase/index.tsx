"use client";

import { useState, useEffect } from "react";
import { Backdrop, Button, IconButton, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  imgSrc: string;
  open: boolean;
  onClick?: () => void;
}

export default function Showcase(props: Props) {
  const { imgSrc, open, onClick } = props;

  const onClickHandler = () => {
    console.log("clicked");
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt="?"
        // width={size}
        // height={size}
        loading="lazy"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          objectFit: "contain",
        }}
      />
    </Backdrop>
  );
}
