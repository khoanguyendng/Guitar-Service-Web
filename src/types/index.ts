export type { Database } from "./supabase";

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service_type: string;
  guitar_type: string;
  description?: string;
  preferred_date: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price_from: number;
  price_to?: number | null;
  duration_days: number;
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Locale = "vi" | "en";
