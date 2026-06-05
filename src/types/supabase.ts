// Auto-generate the real version with:
//   npx supabase gen types typescript --project-id <your-project-id> > src/types/supabase.ts
// Manual version matches GuitarService PDF Plan v1.0 — Section 12

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
export type MessageStatus = "unread" | "read" | "replied";

export interface Database {
  public: {
    Tables: {
      // ── 1. customers ───────────────────────────────────────
      customers: {
        Row: {
          id:             string;
          created_at:     string;
          name:           string;
          email:          string | null;
          phone:          string | null;
          preferred_lang: string;
          booking_count:  number;
        };
        Insert: {
          id?:            string;
          name:           string;
          email?:         string | null;
          phone?:         string | null;
          preferred_lang?: string;
          booking_count?: number;
        };
        Update: {
          name?:          string;
          email?:         string | null;
          phone?:         string | null;
          preferred_lang?: string;
          booking_count?: number;
        };
      };

      // ── 2. services ────────────────────────────────────────
      services: {
        Row: {
          id:             string;
          created_at:     string;
          name_en:        string;
          name_vi:        string;
          description_en: string;
          description_vi: string;
          price_min:      number;
          price_max:      number | null;
          duration_min:   number;
          warranty_days:  number;
          is_active:      boolean;
          sort_order:     number;
        };
        Insert: {
          id?:            string;
          name_en:        string;
          name_vi:        string;
          description_en?: string;
          description_vi?: string;
          price_min:      number;
          price_max?:     number | null;
          duration_min?:  number;
          warranty_days?: number;
          is_active?:     boolean;
          sort_order?:    number;
        };
        Update: {
          name_en?:       string;
          name_vi?:       string;
          description_en?: string;
          description_vi?: string;
          price_min?:     number;
          price_max?:     number | null;
          duration_min?:  number;
          warranty_days?: number;
          is_active?:     boolean;
          sort_order?:    number;
        };
      };

      // ── 3. bookings ────────────────────────────────────────
      bookings: {
        Row: {
          id:             string;
          created_at:     string;
          customer_id:    string | null;
          service_type:   string;
          scheduled_at:   string | null;
          status:         BookingStatus;
          notes:          string | null;
          images:         string[];
          // convenience / app fields
          name:           string | null;
          email:          string | null;
          phone:          string | null;
          guitar_type:    string | null;
          preferred_date: string | null;
          description:    string | null;
          language:       string;
          time_slot:      string;
        };
        Insert: {
          id?:            string;
          customer_id?:   string | null;
          service_type:   string;
          scheduled_at?:  string | null;
          status?:        BookingStatus;
          notes?:         string | null;
          images?:        string[];
          name?:          string | null;
          email?:         string | null;
          phone?:         string | null;
          guitar_type?:   string | null;
          preferred_date?: string | null;
          description?:   string | null;
          language?:      string;
          time_slot?:     string;
        };
        Update: {
          customer_id?:   string | null;
          service_type?:  string;
          scheduled_at?:  string | null;
          status?:        BookingStatus;
          notes?:         string | null;
          images?:        string[];
          name?:          string | null;
          email?:         string | null;
          phone?:         string | null;
          guitar_type?:   string | null;
          preferred_date?: string | null;
          description?:   string | null;
          language?:      string;
          time_slot?:     string;
        };
      };

      // ── 4. blog_posts ──────────────────────────────────────
      blog_posts: {
        Row: {
          id:           string;
          created_at:   string;
          updated_at:   string;
          slug:         string;
          title_en:     string;
          title_vi:     string;
          excerpt_en:   string | null;
          excerpt_vi:   string | null;
          content_en:   string | null;
          content_vi:   string | null;
          category:     string;
          tags:         string[];
          published_at: string | null;
          author_id:    string | null;
          is_published: boolean;
          is_featured:  boolean;
          read_time:    number | null;
          image_url:    string | null;
        };
        Insert: {
          id?:          string;
          slug:         string;
          title_en:     string;
          title_vi:     string;
          excerpt_en?:  string | null;
          excerpt_vi?:  string | null;
          content_en?:  string | null;
          content_vi?:  string | null;
          category?:    string;
          tags?:        string[];
          published_at?: string | null;
          author_id?:   string | null;
          is_published?: boolean;
          is_featured?:  boolean;
          read_time?:   number | null;
          image_url?:   string | null;
        };
        Update: {
          slug?:        string;
          title_en?:    string;
          title_vi?:    string;
          excerpt_en?:  string | null;
          excerpt_vi?:  string | null;
          content_en?:  string | null;
          content_vi?:  string | null;
          category?:    string;
          tags?:        string[];
          published_at?: string | null;
          is_published?: boolean;
          is_featured?:  boolean;
          read_time?:   number | null;
          image_url?:   string | null;
        };
      };

      // ── 5. gallery_items ───────────────────────────────────
      gallery_items: {
        Row: {
          id:          string;
          created_at:  string;
          image_url:   string;
          before_url:  string | null;
          after_url:   string | null;
          guitar_type: string | null;
          service_id:  string | null;
          caption_en:  string | null;
          caption_vi:  string | null;
          category:    string;
          is_featured: boolean;
          sort_order:  number;
        };
        Insert: {
          id?:         string;
          image_url:   string;
          before_url?: string | null;
          after_url?:  string | null;
          guitar_type?: string | null;
          service_id?: string | null;
          caption_en?: string | null;
          caption_vi?: string | null;
          category?:   string;
          is_featured?: boolean;
          sort_order?:  number;
        };
        Update: {
          image_url?:  string;
          before_url?: string | null;
          after_url?:  string | null;
          guitar_type?: string | null;
          service_id?: string | null;
          caption_en?: string | null;
          caption_vi?: string | null;
          category?:   string;
          is_featured?: boolean;
          sort_order?:  number;
        };
      };

      // ── 6. faqs ────────────────────────────────────────────
      faqs: {
        Row: {
          id:          string;
          created_at:  string;
          question_en: string;
          question_vi: string;
          answer_en:   string;
          answer_vi:   string;
          category:    string;
          sort_order:  number;
          is_active:   boolean;
        };
        Insert: {
          id?:         string;
          question_en: string;
          question_vi: string;
          answer_en:   string;
          answer_vi:   string;
          category?:   string;
          sort_order?:  number;
          is_active?:  boolean;
        };
        Update: {
          question_en?: string;
          question_vi?: string;
          answer_en?:   string;
          answer_vi?:   string;
          category?:    string;
          sort_order?:   number;
          is_active?:   boolean;
        };
      };

      // ── 7. contact_messages ────────────────────────────────
      contact_messages: {
        Row: {
          id:         string;
          created_at: string;
          name:       string;
          email:      string;
          subject:    string | null;
          message:    string;
          images:     string[];
          status:     MessageStatus;
        };
        Insert: {
          id?:      string;
          name:     string;
          email:    string;
          subject?: string | null;
          message:  string;
          images?:  string[];
          status?:  MessageStatus;
        };
        Update: {
          status?:  MessageStatus;
          subject?: string | null;
        };
      };

      // ── 8. chat_sessions ───────────────────────────────────
      chat_sessions: {
        Row: {
          id:            string;
          created_at:    string;
          session_id:    string;
          messages_json: Json;
          locale:        string;
        };
        Insert: {
          id?:           string;
          session_id:    string;
          messages_json?: Json;
          locale?:       string;
        };
        Update: {
          messages_json?: Json;
          locale?:        string;
        };
      };

      // ── 9. availability_slots ──────────────────────────────
      availability_slots: {
        Row: {
          id:           string;
          created_at:   string;
          date:         string;
          start_time:   string;
          end_time:     string;
          is_available: boolean;
          booking_id:   string | null;
        };
        Insert: {
          id?:          string;
          date:         string;
          start_time:   string;
          end_time:     string;
          is_available?: boolean;
          booking_id?:  string | null;
        };
        Update: {
          is_available?: boolean;
          booking_id?:   string | null;
        };
      };

      // ── 10. site_settings ──────────────────────────────────
      site_settings: {
        Row: {
          key:        string;
          value_en:   string | null;
          value_vi:   string | null;
          updated_at: string;
        };
        Insert: {
          key:        string;
          value_en?:  string | null;
          value_vi?:  string | null;
          updated_at?: string;
        };
        Update: {
          value_en?:  string | null;
          value_vi?:  string | null;
          updated_at?: string;
        };
      };
    };

    Views:   Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      booking_status: BookingStatus;
      message_status: MessageStatus;
    };
  };
}
