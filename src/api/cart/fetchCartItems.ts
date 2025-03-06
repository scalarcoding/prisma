// import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
// import { supabase } from "../repository/supabase";


// export const fetchWarehouseRequisitionCarts = async (
//     userId: string
// ): Promise<WarehouseRequisitionCart[] | { error: string }> => {
//     try {
//         const { data, error } = await supabase
//             .from('warehouse_requisition_cart')
//             .select(
//                 `ordered_by_id, id, item_number, reg_number, order_qty, inventory_value, inventory_cost`
//             )
//             .eq('ordered_by_id', userId);

//         if (error) throw new Error(error.message);
//         console.log('Warehouse requisition carts:', data);
        
//         return data as WarehouseRequisitionCart[];
//     } catch (err) {
//         console.error('Error fetching warehouse requisition carts:', err);
//         return { error: (err as Error).message };
//     }
// };
