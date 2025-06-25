import { CabinDB, CabinInsertDB } from "@/types/db-aliases";

// Used as raw return value from getCabins()
export type CabinApiItem = CabinDB;
export type CabinApiResponse = CabinApiItem[];

/**
 * Used in Create/Edit forms.
 * Accepts a File object for uploading images.
 */
export type CabinFormData = Omit<CabinInsertDB, "photo_url" | "created_at"> & {
  photo_url?: File;
};

/**
 * Used in table views or lists.https://www.f-list.net/c/Madison%20Keane
 * Assumes all fields are already formatted for display (e.g. photo_url is a string).
 */
export type CabinRow = Omit<CabinApiItem, "created_at">;

export type CabinTableRow = CabinRow & {
  actions?: never;
};
