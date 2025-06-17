import type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from "@/types/database.types";

// Cabin types
export type CabinData = Tables<"cabins">;
export type CabinInsertData = TablesInsert<"cabins">;
export type CabinUpdateData = TablesUpdate<"cabins">;

// Booking types
export type BookingData = Tables<"bookings">;
export type BookingInsertData = TablesInsert<"bookings">;
export type BookingUpdateData = TablesUpdate<"bookings">;

// Guest types
export type GuestData = Tables<"guests">;
export type GuestInsertData = TablesInsert<"guests">;
export type GuestUpdateData = TablesUpdate<"guests">;

// Settings types
export type SettingData = Tables<"settings">;
export type SettingInsertData = TablesInsert<"settings">;
export type SettingUpdateData = TablesUpdate<"settings">;

// Booking Guest relationship types
export type BookingGuestData = Tables<"booking_guests">;
export type BookingGuestInsertData = TablesInsert<"booking_guests">;
export type BookingGuestUpdateData = TablesUpdate<"booking_guests">;

// Enum types
export type BookingStatusData = Enums<"booking_status">;

// Custom types for your application
export type BookingWithGuestsData = BookingData & {
  primary_guest?: GuestData;
  guests?: GuestData[];
  cabin?: CabinData;
};

// Helper types
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never;
