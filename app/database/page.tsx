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

const data1: [number, string, number, number, number, number][] = [
  [1, "tag1", 1, 1, 2, 3],
  [2, "tag2", 2, 2, 39, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
  [3, "tag3", 3, 3, 9, 1],
];

export default function Page() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          {TabItems.map((item, index) => (
            <Tab label={item} key={index} />
          ))}
        </Tabs>
      </Box>

      {TabItems.map((item, index) => (
        <CustomTabPanel value={tabIndex} index={index} key={index}>
          <DatabaseTable rows={data1} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}
