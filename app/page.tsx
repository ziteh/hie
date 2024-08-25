import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import TreeView from "@/app/components/sidebar/treeview";
import { generateTagTree } from "@/src/tagTreeGenerator";

export default async function Page() {
  return (
    <div>
      <TreeView items={await generateTagTree()} />

      {/* <Box sx={{ display: "flex" }}>
        <Topbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          Main
        </Box>
      </Box> */}
    </div>
  );
}
