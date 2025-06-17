// src/services/supabase/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database.types";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // or just `dotenv.config()` if you're using the default `.env`

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error("Missing Supabase admin credentials in .env.local");
}

export const supabaseAdmin = createClient<Database>(supabaseUrl, serviceKey);
