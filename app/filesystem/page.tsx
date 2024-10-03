"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  Breadcrumbs,
  Button,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Tag, TagRelationChain, SimpleTag } from "@/app/lib/types";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useTagTreeState } from "@/app/store/tagTree";
import { useRouter } from "next/navigation";
import { Folder, FileStructure } from "@/app/lib/types";
import { listFolder } from "@/app/lib/folders";
import { getFileStructure } from "@/app/lib/fs";

export default function Page() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [fileStructureSet, setFileStructureSet] =
    useState<FileStructure | null>(null);
  const [subFolders, setSubFolders] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    updateFolders();
  }, []);

  const updateFolders = async () => {
    const folders = await listFolder(false);
    setFolders(folders);
  };

  const handleSelectFolder = async (
    event: SelectChangeEvent<string>,
    _child: ReactNode
  ) => {
    const id = Number(event.target.value);

    const folder = folders.find((f) => f.id === id) || null;
    setSelectedFolder(folder);

    const fs = await getFileStructure(folder?.path || "");
    setFileStructureSet(fs);
  };

  const handleSubFolderAdd = async (newFolder: string) => {
    handlePathChange(subFolders.concat(newFolder));
  };

  const handleSubFolderRemove = async () => {
    if (subFolders.length === 0) {
      return;
    }
    handlePathChange(subFolders.slice(0, -1));
  };

  const handlePathChange = async (subFolders: string[]) => {
    if (selectedFolder === null) {
      return;
    }

    const path = subFolders.join("/");
    const fullPath = selectedFolder.path + path;
    const fs = await getFileStructure(fullPath);
    setFileStructureSet(fs);

    setSubFolders(subFolders);
  };

  return (
    <div>
      <Button onClick={() => handleSubFolderRemove()}>Back</Button>

      <Select label="Folder" onChange={handleSelectFolder}>
        {folders.map((folder: Folder) => (
          <MenuItem key={folder.id} value={folder.id}>
            {folder.name} ({folder.path})
          </MenuItem>
        ))}
      </Select>
      {fileStructureSet?.dir.map((d) => (
        <Button key={d} onClick={() => handleSubFolderAdd(d)}>
          {d}
        </Button>
      ))}
      {fileStructureSet?.files.map((file) => <p key={file}>{file}</p>)}
    </div>
  );
}
