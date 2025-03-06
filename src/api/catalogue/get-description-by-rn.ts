import { SupabaseError } from "@/types/system/supabase-error";
import { supabase } from "../repository/supabase";

/**
 * Fetch a catalogue record by the registration number.
 * @param regNumber - The registration number to search for.
 * @returns - An object with `item_description` or an error message.
 */
export const getCatalogueByRegNumber = async (
  regNumber: string
): Promise<{ item_description: string, held_at_bin: boolean, part_number: string } | { error: string }> => {
  try {
    const { data, error } = await supabase
      .rpc('get_catalogue_by_reg_number', { p_reg_number: regNumber });

    if (error) throw new Error(error.message);

    if (!data || data.length === 0) {
      return { error: 'No data found for the given registration number.' };
    }

    // Assuming the RPC returns a single record
    return data[0] as { item_description: string, held_at_bin: boolean, part_number: string };
  } catch (err) {
    const error = err as SupabaseError;
    console.error('Error fetching catalogue by registration number:', err);
    return { error: error.message };
  }
};

