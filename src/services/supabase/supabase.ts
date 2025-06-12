import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../database.types";

// Use Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Check that the environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Missing Supabase environment variables. Check .env.local file."
  );
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
