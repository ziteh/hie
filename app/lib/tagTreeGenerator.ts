import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { listTag, getTag } from "@/app/lib/tags";
import { Tag } from "@/app/lib/db/types";

export async function generateTagTree(): Promise<TreeViewBaseItem[]> {
  let treeItems: TreeViewBaseItem[] = [];
  const tags = await listTag(true, true, false);

  for (const tag of tags) {
    // Skip non-root tags
    if (tag.parent !== undefined && tag.parent !== null) {
      continue;
    }

    const item = await convertTagToItem(tag);
    treeItems.push(item);
  }

  return treeItems;
}

async function convertTagToItem(tag: Tag): Promise<TreeViewBaseItem> {
  let children: TreeViewBaseItem[] = [];

  if (tag.children !== undefined && tag.children.length > 0) {
    for (const ch of tag.children) {
      const chTag = await getTag(ch.childId, true, true, false);
      if (chTag === null) {
        continue;
      }
      children.push(await convertTagToItem(chTag));
    }
  }

  const item: TreeViewBaseItem = {
    id: String(tag.id),
    label: tag.name,
    children: children.length > 0 ? children : undefined,
  };

  return item;
}
