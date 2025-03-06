export interface WarehouseRequisitionCart {

  //mandatory
  id: number;
  item_description: string;
  ordered_by_id: string;
  item_number?: number;
  reg_number: number;
  order_qty?: number;

  //optionals
  img_url: string | null;
  inventory_value?: number | null;
  inventory_cost?: number | null;
  item_notes: string | null;
}


export interface AddItemPayload {
  cartItemId: string | null;
  district:string;
  userId: string;
  regNumber: number;
  itemNumber?: number | null;
  orderQty?: number | null;
  inventoryValue?: number | null;
  inventoryCost?: number | null;
}

