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


const drawerWidth = 240;
const collapsedWidth = 80;

const NavList = [
  { label: "Home", url: "/explorer" },
  { label: "Database", url: "/database" },
  { label: "Docs", url: "/api/docs" },
];

interface Props {
  open: boolean;
}

export default function Sidebar(props: Props) {
  const router = useRouter();
  const { open } = props;
  // const [open, setOpen] = React.useState(true);
  const { tagTreeItems, updateTagTree, updateSelectedTagId } =
    useTagTreeState();

  React.useEffect(() => {
    updateTagTree();
  }, []);

  const handleTagSelect = (event: React.SyntheticEvent, id: string) => {
    router.push(`/explorer/${id}`);
    // try {
    //   updateSelectedTagId(Number(id));
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <Drawer
      // variant="permanent"
      variant="persistent"
      open={open}
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
          {NavList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={item.url}>{item.label}</ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <TreeView items={tagTreeItems} onItemClick={handleTagSelect} />
      </Box>
    </Drawer>
  );
}
