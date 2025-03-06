// Define a type for Supabase error structure
export interface SupabaseError {
    message: string;
    code?: string;
    details?: string;
  }