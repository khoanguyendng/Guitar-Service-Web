// Auto-generate the real version with:
//   npx supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string;
          email: string;
          service_type: string;
          guitar_type: string;
          description: string | null;
          preferred_date: string;
          status: "pending" | "confirmed" | "completed" | "cancelled";
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone: string;
          email: string;
          service_type: string;
          guitar_type: string;
          description?: string | null;
          preferred_date: string;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
          notes?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          service_type?: string;
          guitar_type?: string;
          description?: string | null;
          preferred_date?: string;
          status?: "pending" | "confirmed" | "completed" | "cancelled";
          notes?: string | null;
        };
      };
      services: {
        Row: {
          id: string;
          created_at: string;
          name_vi: string;
          name_en: string;
          description_vi: string;
          description_en: string;
          price_from: number;
          price_to: number | null;
          duration_days: number;
          is_active: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          name_vi: string;
          name_en: string;
          description_vi: string;
          description_en: string;
          price_from: number;
          price_to?: number | null;
          duration_days?: number;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          name_vi?: string;
          name_en?: string;
          description_vi?: string;
          description_en?: string;
          price_from?: number;
          price_to?: number | null;
          duration_days?: number;
          is_active?: boolean;
          sort_order?: number;
        };
      };
      gallery: {
        Row: {
          id: string;
          created_at: string;
          image_url: string;
          caption_vi: string | null;
          caption_en: string | null;
          category: string;
          is_featured: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          image_url: string;
          caption_vi?: string | null;
          caption_en?: string | null;
          category?: string;
          is_featured?: boolean;
          sort_order?: number;
        };
        Update: {
          image_url?: string;
          caption_vi?: string | null;
          caption_en?: string | null;
          category?: string;
          is_featured?: boolean;
          sort_order?: number;
        };
      };
      testimonials: {
        Row: {
          id: string;
          created_at: string;
          customer_name: string;
          rating: number;
          content_vi: string;
          content_en: string | null;
          is_approved: boolean;
          avatar_url: string | null;
        };
        Insert: {
          id?: string;
          customer_name: string;
          rating: number;
          content_vi: string;
          content_en?: string | null;
          is_approved?: boolean;
          avatar_url?: string | null;
        };
        Update: {
          customer_name?: string;
          rating?: number;
          content_vi?: string;
          content_en?: string | null;
          is_approved?: boolean;
          avatar_url?: string | null;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          created_at: string;
          session_id: string;
          messages: Json;
          locale: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          messages?: Json;
          locale?: string;
        };
        Update: {
          messages?: Json;
          locale?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      booking_status: "pending" | "confirmed" | "completed" | "cancelled";
    };
  };
}
