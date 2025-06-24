// Aliased types built from Supabase schema, used across app for clarity.
// Examples: CabinDB, CabinInsertDB, BookingWithGuestsDB, etc.

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from "@/types/supabase.types";

// Cabin types
export type CabinDB = Tables<"cabins">;
export type CabinInsertDB = TablesInsert<"cabins">;
export type CabinUpdateDB = TablesUpdate<"cabins">;

// Booking types
export type BookingDB = Tables<"bookings">;
export type BookingInsertDB = TablesInsert<"bookings">;
export type BookingUpdateDB = TablesUpdate<"bookings">;

// Guest types
export type GuestDB = Tables<"guests">;
export type GuestInsertDB = TablesInsert<"guests">;
export type GuestUpdateDB = TablesUpdate<"guests">;

// Settings types
export type SettingDB = Tables<"settings">;
export type SettingInsertDB = TablesInsert<"settings">;
export type SettingUpdateDB = TablesUpdate<"settings">;

// Booking Guest relationship types
export type BookingGuestDB = Tables<"booking_guests">;
export type BookingGuestInsertDB = TablesInsert<"booking_guests">;
export type BookingGuestUpdateDB = TablesUpdate<"booking_guests">;

// Enum types
export type BookingStatusDB = Enums<"booking_status">;

// Custom types for your application
export type BookingWithGuestsDB = BookingDB & {
  primary_guest?: GuestDB;
  guests?: GuestDB[];
  cabin?: CabinDB;
};

// Helper types
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
