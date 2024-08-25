import { create } from "zustand";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { generateTagTree } from "@/src/tagTreeGenerator";

export interface TagTreeState {
  tagTreeItems: TreeViewBaseItem[];
  clearTagTree: () => void;
  updateTagTree: () => void;
}

export const useTagTreeState = create<TagTreeState>()((set, get) => ({
  tagTreeItems: [],
  clearTagTree: () => set({ tagTreeItems: [] }),
  updateTagTree: async () => {
    const items = await generateTagTree();
    set({ tagTreeItems: items });

    console.debug("Store TagTree: ", get());
  },
}));
