import { supabase } from "../supabase/supabase";

const TABLE_NAME = "cabins";
const COLUMN_NAME = "id";

export async function getCabins() {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Failed to fetch cabins");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq(COLUMN_NAME, id);

  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error("Failed to delete cabin");
  }

  return data;
}
