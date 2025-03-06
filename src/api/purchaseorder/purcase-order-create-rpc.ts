import { PurchaseOrder, PurchaseOrderItem } from "@/types/purchase_order/purchase-order";
import { supabase } from "../repository/supabase";


// Define interfaces for the response type
// interface PurchaseOrder {
//   poNumber: string;
//   supplierId: string | null;
//   grandTotal: number | null;
//   createdAt: string;
//   dueDate: string | null;
//   deliveryPointId: string | null;
//   insurance: number;
//   taxes: number | null;
//   shippingRate: number | null;
//   paymentTerms: string | null;
//   paymentMethods: string | null;
//   paymentDescription: string | null;
//   poNarrative: string | null;
//   shippingMethod: string | null;
//   discount: number;
//   netTotal: number;
//   lockToken: string | null;
//   district: string;
// }

interface InsertedPurchaseOrderResponse {
  new_po_number: string; // The newly generated PO number
  inserted_data: PurchaseOrder; // The inserted purchase order data
  status: string; // Success status
  message?: string; // Optional message for more details
}

// Function to call the generate_next_po_and_insert RPC function
const insertPurchaseOrderWithNextPo = async ( 
  purchaseOrder: PurchaseOrder, poItems: PurchaseOrderItem[],
): Promise<InsertedPurchaseOrderResponse> => {
  try {
    // Convert the purchase order object to JSONB format
    const poInput = {
      po_number: purchaseOrder.poNumber,
      supplier_id: purchaseOrder.supplierId,
      gross_total: parseFloat(purchaseOrder.grandTotal!.toString()),
      due_date: purchaseOrder.dueDate,
      delivery_point_id: purchaseOrder.deliveryPointId,
      insurance: purchaseOrder.insurance,
      taxes: purchaseOrder.taxes,
      shipping_rate: purchaseOrder.shippingRate,
      payment_terms: purchaseOrder.paymentTerms,
      payment_methods: purchaseOrder.paymentMethods,
      payment_description: purchaseOrder.paymentDescription,
      po_narrative: purchaseOrder.poNarrative,
      shipping_method: purchaseOrder.shippingMethod,
      discount: purchaseOrder.discount,
      net_total: purchaseOrder.netTotal,
      lock_token: purchaseOrder.lockToken,
      district: purchaseOrder.district,
      warehouseId: purchaseOrder.warehouseId,
      purchaserId: purchaseOrder.purchaserId,
    };

    console.log('PO Input');
    
    console.log(poInput);

    console.log('PO Items');
    console.log(poItems);
    
    

    // Call the RPC function to generate the next PO number and insert the PO
    const { data, error } = await supabase
      .rpc('insert_purchase_order', {
        po_input: poInput,
        po_items: poItems,
      });

    if (error) {
      throw new Error(error.message);
    }

    // Return the response with the new PO number and inserted data
    return {
      new_po_number: data.new_po_number,
      inserted_data: data.inserted_data,
      status: 'success',
    };
  } catch (err) {
    console.error('Error inserting purchase order:', err);

    // Return a response with an error status and message
    return {
      new_po_number: '',
      inserted_data: {} as PurchaseOrder, // Empty object as a fallback
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export default insertPurchaseOrderWithNextPo;
