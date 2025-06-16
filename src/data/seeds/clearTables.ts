import { supabaseAdmin } from "@/services/supabase/supabaseAdmin";

export async function clearAllTables() {
  await supabaseAdmin.from("bookings").delete().neq("id", 0);
  await supabaseAdmin.from("cabins").delete().neq("id", 0);
  await supabaseAdmin.from("guests").delete().neq("id", 0);
}
