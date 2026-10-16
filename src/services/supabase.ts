export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

function getSupabaseConfig(): SupabaseConfig {
  const env: Record<string, string | undefined> =
    typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env
      : typeof process !== "undefined"
      ? (process.env as Record<string, string | undefined>)
      : {};
  const envUrl = (env.VITE_SUPABASE_URL || "").trim().replace(/\/+$/, "");
  const envAnonKey = (env.VITE_SUPABASE_ANON_KEY || "").trim();

  // If injected at build time by GitHub Actions or .env, use them directly
  if (envUrl && envAnonKey) {
    return { url: envUrl, anonKey: envAnonKey };
  }

  // Fallback for optional manual setup in localStorage (e.g. testing)
  let url = envUrl;
  let anonKey = envAnonKey;
  if (typeof localStorage !== "undefined") {
    const savedUrl = localStorage.getItem("VITE_SUPABASE_URL");
    const savedKey = localStorage.getItem("VITE_SUPABASE_ANON_KEY");
    if (savedUrl) url = savedUrl.trim().replace(/\/+$/, "");
    if (savedKey) anonKey = savedKey.trim();
  }

  return { url, anonKey };
}

export class SupabaseClient {
  private config: SupabaseConfig;

  constructor() {
    this.config = getSupabaseConfig();
  }

  public isConfigured(): boolean {
    return Boolean(this.config.url && this.config.anonKey);
  }

  public getUrl(): string {
    return this.config.url;
  }

  public getConfig(): SupabaseConfig {
    return { ...this.config };
  }

  public setConfig(url: string, anonKey: string): void {
    this.config = {
      url: url.trim().replace(/\/+$/, ""),
      anonKey: anonKey.trim(),
    };
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("VITE_SUPABASE_URL", this.config.url);
      localStorage.setItem("VITE_SUPABASE_ANON_KEY", this.config.anonKey);
    }
  }

  public clearConfig(): void {
    this.config = { url: "", anonKey: "" };
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("VITE_SUPABASE_URL");
      localStorage.removeItem("VITE_SUPABASE_ANON_KEY");
    }
  }

  public async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.isConfigured()) {
      return { success: false, message: "Chưa cấu hình Supabase URL hoặc Anon Key." };
    }
    try {
      const res = await fetch(`${this.config.url}/rest/v1/groups?select=id&limit=1`, {
        method: "GET",
        headers: this.getHeaders(),
      });
      if (res.ok) {
        return { success: true, message: "Kết nối tới Supabase thành công!" };
      }
      return {
        success: false,
        message: `Máy chủ Supabase phản hồi HTTP ${res.status}. Bạn kiểm tra bảng 'groups' đã tạo chưa nhé!`,
      };
    } catch (err: any) {
      return { success: false, message: `Lỗi kết nối mạng: ${err.message || String(err)}` };
    }
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      apikey: this.config.anonKey,
      Authorization: `Bearer ${this.config.anonKey}`,
      Prefer: "return=representation",
    };
  }

  public async from<T>(table: string, queryParams: string = "select=*"): Promise<T[] | null> {
    if (!this.isConfigured()) return null;

    try {
      const url = `${this.config.url}/rest/v1/${table}?${queryParams}`;
      const res = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });
      if (!res.ok) {
        console.warn(`[Supabase] GET ${table} failed: ${res.status}`);
        return null;
      }
      return (await res.json()) as T[];
    } catch (err) {
      console.warn(`[Supabase] Network error fetching ${table}:`, err);
      return null;
    }
  }

  public async insert<T>(table: string, data: Partial<T>): Promise<T | null> {
    if (!this.isConfigured()) return null;

    try {
      const url = `${this.config.url}/rest/v1/${table}`;
      const res = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.warn(`[Supabase] POST ${table} failed: ${res.status}`);
        return null;
      }
      const result = await res.json();
      return Array.isArray(result) ? result[0] : (result as T);
    } catch (err) {
      console.warn(`[Supabase] Network error inserting into ${table}:`, err);
      return null;
    }
  }

  public async update<T>(
    table: string,
    filterParam: string,
    data: Partial<T>
  ): Promise<T | null> {
    if (!this.isConfigured()) return null;

    try {
      const url = `${this.config.url}/rest/v1/${table}?${filterParam}`;
      const res = await fetch(url, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.warn(`[Supabase] PATCH ${table} failed: ${res.status}`);
        return null;
      }
      const result = await res.json();
      return Array.isArray(result) ? result[0] : (result as T);
    } catch (err) {
      console.warn(`[Supabase] Network error updating ${table}:`, err);
      return null;
    }
  }

  public async delete(table: string, filterParam: string): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      const url = `${this.config.url}/rest/v1/${table}?${filterParam}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: this.getHeaders(),
      });
      return res.ok;
    } catch (err) {
      console.warn(`[Supabase] Network error deleting from ${table}:`, err);
      return false;
    }
  }
}

export const supabase = new SupabaseClient();
