import { create } from "zustand";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { generateTagTree } from "@/src/tagTreeGenerator";

export interface TagTreeState {
  tagTreeItems: TreeViewBaseItem[];
  selectedTagId: number;
  clearTagTree: () => void;
  updateTagTree: () => void;
  updateSelectedTagId: (id: number) => void;
}

export const useTagTreeState = create<TagTreeState>()((set, get) => ({
  tagTreeItems: [],
  selectedTagId: 0,
  clearTagTree: () => set({ tagTreeItems: [] }),
  updateTagTree: async () => {
    const items = await generateTagTree();
    set({ tagTreeItems: items });

    console.debug("Store TagTree: ", get());
  },
  updateSelectedTagId: (id) => {
    set({ selectedTagId: id });
    console.debug("Store TagTree selected ID: ", id);
  },
}));
