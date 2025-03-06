import { supabase } from "../repository/supabase";


/**
 * Fetches the email for a given user ID from the public_users table.
 * @param userId - The ID of the user.
 * @returns A promise resolving to the user's email.
 * @throws Will throw an error if the query fails or if the user is not found.
 */
export const getEmailByUserId = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from('public_users')
    .select('email')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error(`Error fetching email for user ID ${userId}: ${error.message}`);
  }

  if (!data || !data.email) {
    throw new Error(`No email found for user ID ${userId}`);
  }

  return data.email;
};
