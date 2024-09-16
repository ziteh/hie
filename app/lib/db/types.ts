// refer to "schema.prisma"

export enum TagType {
  Normal = "NORMAL",
  Category = "CATEGORY",
}

export interface Tag {
  id: number;
  name: string;
  type: TagType;
  starred: boolean;
  backColor?: string;
  textColor?: string;
  createdAt?: Date;
  updatedAt?: Date;
  children?: TagRelation[];
  parent?: TagRelation[];
  items?: ItemRelation[];
}

export interface Item {
  id: number;
  path: string;
  folder?: Folder;
  folderId: number;
  name?: string;
  starred: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  itemRelations?: ItemRelation[];
}

export interface TagRelation {
  id: number;
  parentId: number;
  parent: Tag;
  childId: number;
  child: Tag;
}

export interface ItemRelation {
  id: number;
  tagId: number;
  tag: Tag;
  itemId: number;
  item: Item;
}

export interface Folder {
  id: number;
  name: string;
  path: string;
  items?: Item[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SimpleTag {
  id: number;
  name: string;
}

export interface TagParents {
  self: SimpleTag;
  parents: SimpleTag[];
  children: SimpleTag[];
}
