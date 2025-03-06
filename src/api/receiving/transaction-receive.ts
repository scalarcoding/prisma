import { SupabaseError } from "@/types/system/supabase-error";
import { supabase } from "../repository/supabase";

// Define the type for the items being received
interface Item {
  item_number:number;
  reg_number: string;
  part_number: string;
  qty_order: number;
  rcv_qty: number;
}

interface TransactionReceivePO {
  po_number: string;
  receive_date: string;
  storesperson: string;
  warehouse: string;
  items: Item[];
}



// Type for the function response
type TransactionReceivePOResponse = string;

export const sendTransactionReceivePO = async (transactionData: TransactionReceivePO): Promise<TransactionReceivePOResponse> => {
  try {
    // Send the data to Supabase (replace with your relevant table or RPC endpoint)
    const { error } = await supabase
      .from("purchase_orders")  // Or your relevant table or RPC endpoint
      .insert([transactionData]);

    if (error) {
      // Handle Supabase error
      const supabaseError = error as SupabaseError; // Cast to the custom error type
      return `Error receiving PO: ${supabaseError.message}`;
    } else {
      // Return a success message
      return "Purchase order received successfully!";
    }
  } catch (error) {
    // Catch any unexpected errors and type the error as a generic JavaScript Error
    const jsError = error as Error; // Cast to JavaScript Error type
    return `An unexpected error occurred: ${jsError.message}`;
  }
};
