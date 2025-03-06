import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";

export type WRItem = {
    wr_code:string,
    wr_number:string,
    item_number:number,
    reg_number:number,
    order_qty:number,
    inventory_value:number,
    inventory_cost:number,
    item_notes:string,
    district:string,
}


// Function to convert WarehouseRequisitionCart to WRItem
function convertWarehouseRequisitionCartToWRItem(
    cart: WarehouseRequisitionCart,
    wr_number:string,
    district: string = "Default District" // Optional parameter for district
  ): WRItem {
    return {
      wr_code:`${wr_number}/${cart.item_number}`, // Example: Generate wr_code from id
      wr_number: wr_number, // Example: Same as wr_code
      item_number: cart.item_number ?? 0, // Default to 0 if undefined
      reg_number: cart.reg_number, // Map directly
      order_qty: cart.order_qty ?? 1, // Default to 1 if undefined
      inventory_value: cart.inventory_value ?? 0, // Default to 0 if null/undefined
      inventory_cost: cart.inventory_cost ?? 0, // Default to 0 if null/undefined
      item_notes: `${cart.item_notes}`, // Generate notes from item_description
      district: district, // Use provided district or default
    };
  }


  // Function to convert an array of WarehouseRequisitionCart to WRItem[]
function convertWarehouseRequisitionCartArrayToWRItemArray(
  cartArray: WarehouseRequisitionCart[],
  wr_number: string,
  district: string,// Optional parameter for district
): WRItem[] {
  return cartArray.map(cart => convertWarehouseRequisitionCartToWRItem(cart, wr_number, district));
}
  


  export  { convertWarehouseRequisitionCartToWRItem, convertWarehouseRequisitionCartArrayToWRItemArray }