export interface Category {
  _id: string; // MongoDB ObjectId as string
  slug: string;
  __v: number;
  ancestors: string[]; // could be category IDs or slugs depending on backend design
  audiences: ("men" | "women" | "kids")[]; // narrow typing for now
  createdAt: string; // ISO date string
  name: string;
  order: number;
  parentId: string | null;
  path: string;
  updatedAt: string; // ISO date string
}
