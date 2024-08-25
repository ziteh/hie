import { create } from "zustand";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { generateTagTree } from "@/app/lib/tagTreeGenerator";

export interface TagTreeState {
  tagTreeItems: TreeViewBaseItem[];
  clearTagTree: () => void;
  updateTagTree: () => void;

  selectedTagId: number;
  updateSelectedTagId: (id: number) => void;

  selectedCallback: (id: number) => void;
  subscribeSelected: (callback: (id: number) => void) => void;
}

export const useTagTreeState = create<TagTreeState>()((set, get) => ({
  tagTreeItems: [],
  clearTagTree: () => set({ tagTreeItems: [] }),
  updateTagTree: async () => {
    const items = await generateTagTree();
    set({ tagTreeItems: items });

    console.debug("Store TagTree: ", get());
  },

  selectedTagId: 0,
  updateSelectedTagId: (id) => {
    set({ selectedTagId: id });
    get().selectedCallback(id);
    console.debug("Store TagTree selected ID: ", id);
  },

  selectedCallback: (id) => {},
  subscribeSelected: (callback) => {
    set({ selectedCallback: callback });
  },
}));
