import { supabase } from '@/api/repository/supabase';
import { SupabaseError } from '@/types/system/supabase-error';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a UUID (Universally Unique Identifier).
 * @returns A string representing a UUID.
 */
function generateUUID() {
    return uuidv4();
  }

  
  type AppSession = {
    user_id: string;
    session_id: string;
  };
  
  /**
   * Stores a unique session UUID in the database.
   * @param userId - The ID of the authenticated user.
   * @returns A promise that resolves to the session data or throws an error.
   */
  async function storeUniqueSession(userId: string): Promise<AppSession> {
    let uniqueUUID = generateUUID();
    let attempts = 0;
    const maxAttempts = 5; // Retry up to 5 times in case of a duplicate error
  
    while (attempts < maxAttempts) {
      try {
        // Insert unique session UUID into the `app_session` table
        const { data, error } = await supabase
          .from('app_session')
          .insert([{ user_id: userId, session_id: uniqueUUID }])
          .select('*')
          .single();
  
        if (error) throw error; // Handle error if any
  
        console.log('Session stored successfully:', data);
        return data; // Exit on success
      } catch (error ) {
        const supabaseError = error as SupabaseError; // Cast to the custom error type
        if (supabaseError.code === '23505') { // Duplicate key error (unique constraint violation)
          console.warn('Duplicate UUID detected, re-generating UUID.');
          uniqueUUID = generateUUID(); // Re-generate UUID
          attempts++;
        } else {
          console.error('An error occurred:', supabaseError.message);
          throw error; // Propagate non-duplicate key errors
        }
      }
    }
  
    throw new Error('Failed to generate a unique session UUID after multiple attempts.');
  }


  export{ generateUUID, storeUniqueSession }