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

import TagFormDialog from "./formDialog/tagFormDialog";
import ItemFormDialog from "./formDialog/itemFormDialog";
import FolderFormDialog from "./formDialog/folderFormDialog";

import { useTagTreeState } from "@/app/store/tagTree";
import { useRouter } from "next/navigation";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const drawerWidth = 240;
const collapsedWidth = 80;

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

  const [tagFormOpen, setTagFormOpen] = React.useState(false);
  const [itemFormOpen, setItemFormOpen] = React.useState(false);
  const [folderFormOpen, setFolderFormOpen] = React.useState(false);

  const handleTagFormOpen = () => {
    setTagFormOpen(true);
  };

  const handleTagFormClose = () => {
    setTagFormOpen(false);
  };

  const handleItemFormOpen = () => {
    setItemFormOpen(true);
  };

  const handleItemFormClose = () => {
    setItemFormOpen(false);
  };

  const handleFolderFormOpen = () => {
    setFolderFormOpen(true);
  };

  const handleFolderFormClose = () => {
    setFolderFormOpen(false);
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
          <ListItem disablePadding>
            <ListItemButton onClick={handleTagFormOpen}>
              <ListItemIcon>
                <BookmarkAddIcon />
                New Tag
              </ListItemIcon>
            </ListItemButton>
            <TagFormDialog open={tagFormOpen} onClose={handleTagFormClose} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleItemFormOpen}>
              <ListItemIcon>
                <NoteAddIcon />
                New Item
              </ListItemIcon>
            </ListItemButton>
            <ItemFormDialog open={itemFormOpen} onClose={handleItemFormClose} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={handleFolderFormOpen}>
              <ListItemIcon>
                <CreateNewFolderIcon />
                New Folder
              </ListItemIcon>
            </ListItemButton>
            <FolderFormDialog
              open={folderFormOpen}
              onClose={handleFolderFormClose}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
