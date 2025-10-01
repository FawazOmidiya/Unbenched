import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For client components
export const createSupabaseClient = () => createClientComponentClient();

// Database types
export interface Story {
  id: number;
  title: string;
  article: string;
  banner_image_url?: string;
  sport_id?: number;
  game_id?: number;
  photographer?: string;
  journalist?: string;
  created_at: string;
  updated_at: string;
  excerpt: string;
  date: string;
  // Joined data
  sport?: Sport;
  game?: Game;
}

export interface Game {
  id: number;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  sport: string;
  date: string;
  status: "upcoming" | "live" | "final";
  created_at: string;
  updated_at: string;
}

export interface Sport {
  id: number;
  name: string;
  category: "mens" | "womens" | "other";
  description?: string;
  image_url?: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  filename: string;
  url: string;
  alt_text?: string;
  type: "image" | "video";
  size: number;
  created_at: string;
}

export interface Player {
  id: number;
  sport_id: number;
  name: string;
  number?: number;
  position?: string;
  bio?: string;
  photo_url?: string;
  height?: string;
  weight?: string;
  year?: string;
  hometown?: string;
  major?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
