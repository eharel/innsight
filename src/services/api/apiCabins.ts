import { CabinApiResponse, CabinFormData } from "@/features/cabins";
import { supabase } from "../supabase/supabase";
import { SUPABASE } from "@/constants/config";
import { v4 as uuidv4 } from "uuid";

const TABLE_NAME = "cabins";
const COLUMN_NAME = "id";

export async function getCabins(): Promise<CabinApiResponse> {
  const { data, error } = await supabase.from(TABLE_NAME).select("*");

  if (error) {
    console.error("Error fetching cabins:", error);
    throw new Error("Failed to fetch cabins");
  }

  return data ?? [];
}

export async function createCabin(cabin: CabinFormData) {
  let imageName = "";
  let imagePath = "";

  const { photo_url, ...formData } = cabin;

  if (photo_url) {
    const ext = photo_url.name.split(".").pop(); // e.g., "jpg"
    imageName = `${uuidv4()}.${ext}`;
    imagePath = `${SUPABASE.IMAGE_BUCKET_URL}${imageName}`;
  }

  const cabinInsertPayload = {
    ...formData,
    photo_url: photo_url ? imagePath : null,
  };

  // 1. Create the cabin (save the image path in DB)
  const { data, error } = await supabase
    .from("cabins")
    .insert(cabinInsertPayload)
    .select();

  if (error) {
    console.error("Error creating cabin:", error);
    throw new Error("Failed to create cabin");
  }

  // 2. Upload the image to Supabase storage
  if (photo_url) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, photo_url, {
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) {
      console.error("Error uploading cabin image:", storageError);
      await deleteCabin(data[0].id); // optional rollback
    }
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

  console.log(`Cabin deleted successfully: ${id}`);
  return data;
}
