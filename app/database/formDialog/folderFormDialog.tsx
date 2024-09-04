"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { Folder } from "@/app/lib/db/types";
import { createFolder } from "@/app/lib/folders";

interface Props {
  data?: Folder;
  open: boolean;
  onClose: () => void;
}

export default function FolderFormDialog(props: Props) {
  const { data, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.debug(formJson);

    const name = formJson.name;
    const path = formJson.path;
    const response = await createFolder(name, path);

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
      <DialogTitle>Folder</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              id="name"
              name="name"
              required
              autoFocus
              fullWidth
              autoComplete="off"
            />
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
