import { Box, Toolbar } from "@mui/material";
import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import { generateTagTree } from "@/src/tagTreeGenerator";

export default async function Page() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Topbar />
        <Sidebar items={await generateTagTree()} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          Main
        </Box>
      </Box>
    </div>
  );
}
