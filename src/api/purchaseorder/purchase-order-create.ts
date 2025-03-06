
import { PurchaseOrder } from '@/types/purchase_order/purchase-order';
import { supabase } from '../repository/supabase';

const insertPurchaseOrder = async (purchaseOrder: PurchaseOrder) => {
  try {
    // Insert the purchase order into the 'purchase_orders' table
    const { data, error } = await supabase
      .from('purchase_orders')
      .insert([
        {
          po_number: purchaseOrder.poNumber,
          supplier_id: purchaseOrder.supplierId,
          gross_total: purchaseOrder.grandTotal,
          due_date: null,
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
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    // If the insertion is successful, return the inserted data
    return data;
  } catch (err) {
    console.error('Error inserting purchase order:', err);
    throw err;
  }
};

export default insertPurchaseOrder;
