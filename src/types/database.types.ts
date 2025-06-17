export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_guests: {
        Row: {
          booking_id: number | null
          created_at: string
          guest_id: number | null
          id: number
        }
        Insert: {
          booking_id?: number | null
          created_at?: string
          guest_id?: number | null
          id?: number
        }
        Update: {
          booking_id?: number | null
          created_at?: string
          guest_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_guests_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_guests_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          cabin_id: number | null
          created_at: string
          end_date: string | null
          id: number
          is_paid: boolean | null
          num_guests: number | null
          num_nights: number
          observations: string | null
          primary_guest_id: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          with_breakfast: boolean | null
        }
        Insert: {
          cabin_id?: number | null
          created_at?: string
          end_date?: string | null
          id?: number
          is_paid?: boolean | null
          num_guests?: number | null
          num_nights: number
          observations?: string | null
          primary_guest_id?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          with_breakfast?: boolean | null
        }
        Update: {
          cabin_id?: number | null
          created_at?: string
          end_date?: string | null
          id?: number
          is_paid?: boolean | null
          num_guests?: number | null
          num_nights?: number
          observations?: string | null
          primary_guest_id?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          with_breakfast?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cabin_id_fkey"
            columns: ["cabin_id"]
            isOneToOne: false
            referencedRelation: "cabins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["primary_guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
      cabins: {
        Row: {
          capacity: number | null
          created_at: string
          description: string | null
          discount_amount: number | null
          discount_percent: number | null
          id: number
          name: string | null
          photo_url: string | null
          price: number | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: number
          name?: string | null
          photo_url?: string | null
          price?: number | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          description?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: number
          name?: string | null
          photo_url?: string | null
          price?: number | null
        }
        Relationships: []
      }
      guests: {
        Row: {
          country_flag: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: number
          national_id: string | null
          nationality: string | null
        }
        Insert: {
          country_flag?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Update: {
          country_flag?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          breakfast_price: number | null
          created_at: string
          id: number
          max_booking_days: number | null
          max_guests_per_booking: number | null
          min_booking_days: number | null
        }
        Insert: {
          breakfast_price?: number | null
          created_at?: string
          id?: number
          max_booking_days?: number | null
          max_guests_per_booking?: number | null
          min_booking_days?: number | null
        }
        Update: {
          breakfast_price?: number | null
          created_at?: string
          id?: number
          max_booking_days?: number | null
          max_guests_per_booking?: number | null
          min_booking_days?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status:
        | "unconfirmed"
        | "confirmed"
        | "checked-in"
        | "checked-out"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "unconfirmed",
        "confirmed",
        "checked-in",
        "checked-out",
        "cancelled",
      ],
    },
  },
} as const
