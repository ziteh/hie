"use client";

import React from "react";
import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
} from "@mui/material";
import TreeView from "./treeview";
import { TreeViewBaseItem } from "@mui/x-tree-view";

import { useTagTreeState } from "@/app/store/tagTree";
import { useRouter } from "next/navigation";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const drawerWidth = 240;
const collapsedWidth = 80;

const NavList = [
  { label: "Home", url: "/explorer" },
  { label: "Database", url: "/database" },
  { label: "Docs", url: "/api/docs" },
];

interface Props {}

export default function Sidebar(props: Props) {
  const router = useRouter();
  const open = true;
  const { tagTreeItems, updateTagTree, updateSelectedTagId } =
    useTagTreeState();

  React.useEffect(() => {
    updateTagTree();
  }, []);

  const handleTagSelect = (event: React.SyntheticEvent, id: string) => {
    router.push(`/explorer/${id}`);
    try {
      updateSelectedTagId(Number(id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Drawer
      variant="permanent"
      // variant="persistent"
      // open={open}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        <TreeView items={tagTreeItems} onItemClick={handleTagSelect} />
      </Box>
      <Divider />
      <Box>
        <List>
          {/* {NavList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={item.url}>{item.label}</ListItemButton>
            </ListItem>
          ))} */}
          <ListItem disablePadding>
            <ListItemButton href="/api/docs">
              <ListItemIcon>
                <BookmarkAddIcon />
                New Tag
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/api/docs">
              <ListItemIcon>
                <NoteAddIcon />
                New Item
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="/api/docs">
              <ListItemIcon>
                <CreateNewFolderIcon />
                New Folder
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
