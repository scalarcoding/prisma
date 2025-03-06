import { SupabaseError } from "@/types/system/supabase-error"; // Ensure this is defined somewhere
import { supabase } from "../repository/supabase"; // Adjust path if necessary

// Define the interface for the input parameters
interface UpdateLastActiveDistrictProps {
  user_id: string;
  last_active_district: string;
}

// Function to update the last_active_district
export const updateLastActiveDistrict = async (
{ user_id, last_active_district }: UpdateLastActiveDistrictProps): Promise<{ message?: string; error?: string; }> => {
  try {
    // Validate inputs
    if (!user_id || !last_active_district) {
      throw new Error('user_id and last_active_district are required');
    }

    // Update query for the users table
    const { error } = await supabase
      .from('users') // Your table name
      .update({ last_active_district }) // Update the last_active_district column
      .eq('user_id', user_id); // Match by user_id (assuming it's the unique identifier)

    if (error) {
      throw new Error(`Error updating district: ${error.message}`);
    }

    // Return success response
    return { message: 'District updated successfully' };
  } catch (error) {
    // Handle any errors
    const supabaseError = error as SupabaseError;
    return { error: supabaseError.message };
  }
};
