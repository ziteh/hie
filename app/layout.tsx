import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import theme from "@/app/lib/theme";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hie",
  description: "Hierarchical tag-based image explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* https://mui.com/material-ui/integrations/nextjs/ */}
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ display: "flex" }}>
              <Topbar />
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
