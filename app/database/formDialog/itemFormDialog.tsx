"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Item, ItemRelation, Folder } from "@/app/lib/db/types";
import { createItem } from "@/app/lib/items";
import { createFolder } from "@/app/lib/folders";

interface Props {
  data?: Item;
  folders: Folder[];
  open: boolean;
  onClose: () => void;
}

export default function FolderFormDialog(props: Props) {
  const { data, folders, open, onClose } = props;

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

    handleClose();
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
