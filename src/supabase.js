import { createClient } from "@supabase/supabase-js";

function getEnvValue(key) {
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

export const supabaseUrl =
  getEnvValue("VITE_SUPABASE_URL") ||
  getEnvValue("NEXT_PUBLIC_SUPABASE_URL") ||
  getEnvValue("SUPABASE_URL");

export const supabaseAnonKey =
  getEnvValue("VITE_SUPABASE_ANON_KEY") ||
  getEnvValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ||
  getEnvValue("SUPABASE_ANON_KEY") ||
  getEnvValue("KEY");

const validUrl =
  supabaseUrl && supabaseUrl.startsWith("http")
    ? supabaseUrl.replace(/\/+$/, "")
    : "https://placeholder-project.supabase.co";

const validKey = supabaseAnonKey || "placeholder-anon-key";

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export function isSupabaseConfigured() {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl.startsWith("http") &&
      !supabaseUrl.includes("placeholder-project")
  );
}
