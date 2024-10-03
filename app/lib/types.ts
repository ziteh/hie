import { Prisma } from "@prisma/client";

// Generate type from Prisma, refer to schema.prisma
// https://github.com/prisma/prisma/discussions/10928#discussioncomment-1920961
// https://stackoverflow.com/questions/73626300/how-to-get-prisma-client-to-generate-relationship-types

export type Tag = Prisma.TagGetPayload<{
  include: {
    children: true;
    parent: true;
    items: true;
  };
}>;

export type Item = Prisma.ItemGetPayload<{
  include: {
    folder: true;
    tags: true;
  };
}>;

export type TagRelation = Prisma.TagRelationGetPayload<{
  include: {
    parent: true;
    child: true;
  };
}>;

export type ItemRelation = Prisma.ItemRelationGetPayload<{
  include: {
    tag: true;
    item: true;
  };
}>;

export type Folder = Prisma.FolderGetPayload<{
  include: {
    items: true;
  };
}>;

export enum TagType {
  Normal = "normal",
  Category = "category",
}

export interface SimpleTag {
  id: number;
  name: string;
}

export interface TagRelationChain {
  self: SimpleTag;
  parents: SimpleTag[];
  children: SimpleTag[];
}

export interface FileStructure {
  files: string[];
  dir: string[];
}
