"use client";

import { TagType, Tag } from "@/app/lib/db/types";
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
import { createTag } from "@/app/lib/tags";
import { createTagRelation } from "@/app/lib/tagRelation";

interface Props {
  existingTags: Tag[];
  data?: Tag;
  open: boolean;
  onClose: () => void;
}

export default function TagFormDialog(props: Props) {
  const { existingTags, data, open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.debug(formJson);

    const name = formJson.name;
    const type = formJson.type;
    const starred = formJson.starred === "on";
    const textColor = formJson.textColor || undefined;
    const backColor = formJson.backColor || undefined;
    const response = await createTag(name, type, starred, textColor, backColor);

    const parentId = formJson.parent;
    if (parentId && response) {
      await createTagRelation(Number(parentId), response.id);
    }

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
      <DialogTitle>Tag</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch name="starred" />}
              label="Star"
            />
          </Grid>
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
            <Select
              labelId="type-label"
              label="Type"
              name="type"
              defaultValue={TagType.Normal}
              required
              fullWidth
            >
              <MenuItem value={TagType.Normal}>Normal</MenuItem>
              <MenuItem value={TagType.Category}>Category</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="parent-label"
              label="Parent"
              name="parent"
              fullWidth
            >
              <MenuItem value="">(None)</MenuItem>
              {existingTags.map((tag) => (
                <MenuItem value={tag.id} key={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Text Color"
              id="text-color"
              name="textColor"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Back Color"
              id="back-color"
              name="backColor"
              fullWidth
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
