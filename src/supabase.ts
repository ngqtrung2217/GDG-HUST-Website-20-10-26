import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getEnvValue(key: string): string {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
    return String(import.meta.env[key]).trim();
  }
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return String(process.env[key]).trim();
  }
  if (typeof localStorage !== "undefined") {
    return (localStorage.getItem(key) || "").trim();
  }
  return "";
}

export const supabaseUrl = getEnvValue("VITE_SUPABASE_URL");
export const supabaseAnonKey = getEnvValue("VITE_SUPABASE_ANON_KEY");

// Ensure URL has http(s) prefix if provided
const validUrl =
  supabaseUrl && supabaseUrl.startsWith("http")
    ? supabaseUrl.replace(/\/+$/, "")
    : "https://placeholder-project.supabase.co";

const validKey = supabaseAnonKey || "placeholder-anon-key";

// Official Supabase JS Client
export const supabase: SupabaseClient = createClient(validUrl, validKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl.startsWith("http") &&
      !supabaseUrl.includes("placeholder-project")
  );
}
