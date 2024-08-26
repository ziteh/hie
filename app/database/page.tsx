"use client";

import * as React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import DatabaseTable from "./databaseTable";

const TabItems = ["Tag", "Item", "Folder"];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Page() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          {TabItems.map((item) => (
            <Tab label={item} />
          ))}
        </Tabs>
      </Box>

      {TabItems.map((item, index) => (
        <CustomTabPanel value={tabIndex} index={index}>
          <DatabaseTable />
        </CustomTabPanel>
      ))}
    </Box>
  );
}
