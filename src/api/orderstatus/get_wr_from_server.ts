import { WarehouseRequisitionRetrieve } from "@/pages/OrderStatus/OrdersRetrievalModel";
import { supabase } from "../repository/supabase";

const getWRFromServer = async (
  district: string,
  wrNumber: string
): Promise<WarehouseRequisitionRetrieve | null> => {
  try {
    const { data, error } = await supabase.rpc("get_warehouse_requisition_by_wr_number", {
      p_district: district,
      p_wr_number: wrNumber,
    });

    if (error) {
      console.error("Error fetching warehouse requisition:", error.message);
      throw new Error("Failed to fetch warehouse requisition.");
    }

    console.log("Fetched Data:", data);

    // Check if data is an empty array, and return null if it is
    if (!data || data.length === 0) {
      return null;
    }

    // Return the first item as WarehouseRequisitionRetrieve
    return data[0] as WarehouseRequisitionRetrieve;
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Re-throw to handle it further up the call stack
  }
};




  export { getWRFromServer }