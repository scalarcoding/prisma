export interface PurchaseOrder {
    poNumber: string; // This matches the 'po_number' field
    supplierId: string | null; // This maps to 'supplier_id' (supplier_name can be stored in a separate field or be part of the supplier data)
    grandTotal: number | null; // This maps to 'grand_total'
    createdAt: string; // This maps to 'created_at' (timestamp with timezone)
    dueDate: string | null; // This maps to 'due_date'
    deliveryPointId: string | null; // This maps to 'delivery_point_id'
    insurance:number;
    taxes: number | null; // This maps to 'taxes'
    shippingRate: number | null; // This maps to 'shipping_rate'
    paymentTerms: string | null; // This maps to 'payment_terms'
    paymentMethods: string | null; // This maps to 'payment_methods'
    paymentDescription: string | null; // This maps to 'payment_description'
    poNarrative: string | null; // This maps to 'po_narrative'
    shippingMethod: string | null; // This maps to 'shipping_method'
    discount : number;
    netTotal: number;
    district: string | null; // This maps to 'district_id'
    purchaserId: string | null; // This maps to 'purchaser_id'
    warehouseId: string | null; // This maps to 'warehouse_id'
    lockToken: string | null;
    approved_date?:Date | null;
    description? : string | null;
    items? : PurchaseOrderItem[];
  }

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
  
  export interface PurchaseOrderItem {
    toReceive:boolean;
    poItemId: string; // This maps to 'po_item_id'
    description?:string;
    poNumber: string; // This maps to 'po_number' (foreign key)
    poItem: number; // This maps to 'po_item' (order item number)
    qty_order:number;
    regId: number | null; // This maps to 'reg_id'
    partNumber : string;  // This maps to 'part_number'
    heldAtBin: boolean | null; // This maps to 'held_at_bin'
    markPrice: number; // This maps to 'mark_price'
    lastPrice: number; // This maps to 'last_price'
    subtotal: number; // This maps to 'subtotal'
    itemDiscount: number | null; // This maps to 'item_discount'
    itemInsurance: number | null; // This maps to 'item_insurance'
    itemNarrative: string | null; // This maps to 'item_narrative'
    qty_receive?: string | null;
  }
  