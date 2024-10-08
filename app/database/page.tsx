"use client";

import * as React from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import DatabaseTable from "./databaseTable";
import { listTag } from "@/app/lib/tags";
import { listItem } from "@/app/lib/items";
import { listFolder } from "@/app/lib/folders";
import { HeadCell, TagRow, ItemRow, FolderRow } from "./databaseTable/types";

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

const tagHeader: HeadCell[] = [
  {
    id: 0,
    label: "Name",
    align: "right",
  },
  {
    id: 1,
    label: "Type",
    align: "right",
  },
  {
    id: 2,
    label: "Parent",
    align: "right",
  },
  {
    id: 3,
    label: "Updated",
    align: "right",
  },
  {
    id: 4,
    label: "Created",
    align: "right",
  },
];

const itemHeader: HeadCell[] = [
  {
    id: 0,
    label: "Name",
    align: "right",
  },
  {
    id: 1,
    label: "Path",
    align: "right",
  },
  {
    id: 2,
    label: "Starred",
    align: "right",
  },
  {
    id: 3,
    label: "Updated",
    align: "right",
  },
  {
    id: 4,
    label: "Created",
    align: "right",
  },
];

const folderHeader: HeadCell[] = [
  {
    id: 0,
    label: "Name",
    align: "right",
  },
  {
    id: 1,
    label: "Path",
    align: "right",
  },
  {
    id: 2,
    label: "Updated",
    align: "right",
  },
  {
    id: 3,
    label: "Created",
    align: "right",
  },
];

export default function Page() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const [tagRows, setTagRows] = React.useState<TagRow[]>([]);
  const [itemRows, setItemRows] = React.useState<ItemRow[]>([]);
  const [folderRows, setFolderRows] = React.useState<FolderRow[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  React.useEffect(() => {
    listTag(null, true, true, false).then((data) => {
      const list: TagRow[] = data.map((item) => {
        const updateDate = item.updatedAt
          ? new Date(item.updatedAt).toISOString()
          : "N/A";

        const createDate = item.createdAt
          ? new Date(item.createdAt).toISOString()
          : "N/A";

        return [
          item.id,
          item.name,
          item.type,
          item.parent ? "Has parent" : "No parent",
          updateDate,
          createDate,
        ];
      });
      setTagRows(list);
    });

    listItem().then((data) => {
      const list: ItemRow[] = data.map((item) => {
        const updateDate = item.updatedAt
          ? new Date(item.updatedAt).toISOString()
          : "N/A";

        const createDate = item.createdAt
          ? new Date(item.createdAt).toISOString()
          : "N/A";

        return [
          item.id,
          item.name || "N/A",
          item.path,
          item.starred ? "Starred" : "",
          updateDate,
          createDate,
        ];
      });
      setItemRows(list);
    });

    listFolder(false).then((data) => {
      const list: FolderRow[] = data.map((item) => {
        const updateDate = item.updatedAt
          ? new Date(item.updatedAt).toISOString()
          : "N/A";

        const createDate = item.createdAt
          ? new Date(item.createdAt).toISOString()
          : "N/A";

        return [item.id, item.name, item.path, updateDate, createDate];
      });
      setFolderRows(list);
    });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Tag" key={0} />
          <Tab label="Item" key={1} />
          <Tab label="Folder" key={2} />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabIndex} index={0} key={0}>
        <DatabaseTable heads={tagHeader} rows={tagRows} />
      </CustomTabPanel>

      <CustomTabPanel value={tabIndex} index={1} key={1}>
        <DatabaseTable heads={itemHeader} rows={itemRows} />
      </CustomTabPanel>

      <CustomTabPanel value={tabIndex} index={2} key={2}>
        <DatabaseTable heads={folderHeader} rows={folderRows} />
      </CustomTabPanel>
    </Box>
  );
}
