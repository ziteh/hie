"use client";

import {
  AppBar,
  Box,
  Breadcrumbs,
  IconButton,
  InputBase,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import StorageIcon from "@mui/icons-material/Storage";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { Tag, TagRelationChain, SimpleTag } from "@/app/lib/types";
import { useTagTreeState } from "@/app/store/tagTree";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface Props {
  isDesktop: boolean;
  onClick?: () => void;
}

export default function Topbar(props: Props) {
  const { isDesktop, onClick } = props;
  const { selectedTagId, updateSelectedTagId } = useTagTreeState();
  const [parents, setParents] = useState<SimpleTag[]>([]);
  const [tag, setTag] = useState<SimpleTag | null>(null);
  const router = useRouter();

  useEffect(() => {
    updateTag(selectedTagId);
  }, [selectedTagId]);

  const updateTag = async (id: number) => {
    const response = await fetch(`/api/tags/${id}/parents`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return;
    }

    const data: TagRelationChain = await response.json();
    setParents(data.parents);
    setTag(data.self);
  };

  const onBreadcrumbNav = (id?: number) => {
    if (id === undefined) {
      router.push(`/explorer`);
      return;
    }

    updateSelectedTagId(id);
    router.push(`/explorer/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {!isDesktop && (
              <IconButton onClick={onClick}>
                <MenuIcon />
              </IconButton>
            )}
            <Link
              underline="none"
              color="inherit"
              onClick={() => onBreadcrumbNav()}
            >
              Hie
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Breadcrumbs>
              <Link
                underline="none"
                color="inherit"
                onClick={() => onBreadcrumbNav()}
              >
                <HomeIcon fontSize="small" />
              </Link>
              {parents.map((p, i) => (
                <Link
                  key={i}
                  underline="hover"
                  color="inherit"
                  onClick={() => onBreadcrumbNav(p.id)}
                >
                  {p.name}
                </Link>
              ))}
              <Typography sx={{ color: "text.primary" }}>
                {tag?.name}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Search sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton
            href="/database"
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <StorageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
