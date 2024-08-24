// refer to "schema.prisma"

export enum TagType {
  Normal = "NORMAL",
  Category = "CATEGORY",
}

export interface Tag {
  id: number;
  name: string;
  type: TagType;
  star: boolean;
  backColor?: string;
  textColor?: string;
  createdAt?: Date;
  updatedAt?: Date;
  children?: TagRelation[];
  parents?: TagRelation[];
  itemRelations?: ItemRelation[];
}

export interface Item {
  id: number;
  path: string;
  basePath?: Path;
  basePathId: number;
  name?: string;
  star: boolean;
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

export interface Path {
  id: number;
  name: string;
  path: string;
  items?: Item[];
}
