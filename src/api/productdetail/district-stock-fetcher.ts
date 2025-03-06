import { SupabaseError } from "@/types/system/supabase-error";
import { supabase } from "../repository/supabase";

// Define the function to fetch district stock data
export const fetchDistrictStockData = async (district: string, reg_number: string, wh : string) => {
  try {
    const { data, error } = await supabase
      .from("district_stock") // Your Supabase table name
      .select("*") // Select all fields or specify the columns you need
      .eq("district", district) // Filter by district
      .eq("reg_number", reg_number) // Filter by reg_number
      .eq('warehouse', wh); // Filter by warehouse

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    

    return { data };
  } catch (error) {
    const superror = error as SupabaseError;
    console.error("Error fetching district stock data:", error);
    return { error: superror.message };
  }
};
