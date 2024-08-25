// MUI theme global config
// https://mui.com/material-ui/integrations/nextjs/#theming

"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiSkeleton: {
      defaultProps: {
        variant: "rounded",
      },
    },
  },
});

export default theme;
