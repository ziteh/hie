"use client";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { Item, ItemRelation, Folder, Tag } from "@/app/lib/types";
import { createItem } from "@/app/lib/items";
import { createFolder } from "@/app/lib/folders";
import React from "react";
import { createItemRelation } from "@/app/lib/itemRelation";

const SEP = "\t";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  data?: Item;
  folders: Folder[];
  tags: Tag[];
  open: boolean;
  onClose: () => void;
}

export default function ItemFormDialog(props: Props) {
  const { data, folders, tags, open, onClose } = props;
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.debug(formJson);

    const folderId = Number(formJson.folder);
    const path = formJson.path;
    const name = formJson.name || undefined;
    const starred = formJson.starred === "on";
    const response = await createItem(path, folderId, name, starred);

    if (response !== null && selectedTags.length > 0) {
      for (const tag of selectedTags) {
        const tagId = Number(tag.split(SEP)[0]);
        await createItemRelation(tagId, response.id);
      }
    }

    handleClose();
  };

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Item</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch name="starred" />}
              label="Star"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="folder-label"
              label="Folder"
              name="folder"
              fullWidth
            >
              {folders.map((f) => (
                <MenuItem value={f.id} key={f.id}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Path"
              id="path"
              name="path"
              required
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              id="name"
              name="name"
              autoFocus
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              fullWidth
              value={selectedTags}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value.split(SEP)[0]}
                      label={value.split(SEP)[1]}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tags.map((t) => (
                <MenuItem key={t.id} value={`${t.id}${SEP}${t.name}`}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
