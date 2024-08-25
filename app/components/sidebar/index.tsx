"use client";

import React from "react";
import {
  Box,
  Divider,
  Drawer,
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

const drawerWidth = 240;
const collapsedWidth = 80;

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const { tagTreeItems, updateTagTree, updateSelectedTagId } = useTagTreeState(
    (s) => s
  );

  React.useEffect(() => {
    updateTagTree();
  }, []);

  const handleTagSelect = (event: React.SyntheticEvent, id: string) => {
    try {
      updateSelectedTagId(Number(id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = () => {
    setOpen(!open);
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
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <TreeView items={tagTreeItems} onItemClick={handleTagSelect} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        <IconButton onClick={handleToggle}>Open</IconButton>
      </Box>
    </Drawer>
  );
}
