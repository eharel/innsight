// src/services/supabase/supabase.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase public credentials. Check your .env files."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
