// api/service/SupabaseService.ts
import { ApiService } from "./ApiService";

export class SupabaseService implements ApiService {
  async fetchData(): Promise<unknown> {
    // Supabase specific logic here
    return "Supabase data";
  }
}


