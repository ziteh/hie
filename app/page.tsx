import { Box, Toolbar } from "@mui/material";
import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import Explorer from "@/app/components/explorer";

export default async function Page() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Topbar />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Explorer />
        </Box>
      </Box>
    </div>
  );
}
