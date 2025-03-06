import { supabase } from "@/api/repository/supabase";
import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";

async function getUserCart(userId: string): Promise<WarehouseRequisitionCart[]> {
    let userCart: WarehouseRequisitionCart[] = [];

    const { data, error } = await supabase
        .rpc('get_user_cart', { user_id: userId });

    if (error) {
        console.error('Error calling get_user_cart RPC:', error);
    } else {
        userCart = data || [];
    }

    console.log('User cart:', userCart);
    

    return userCart;
}

export { getUserCart };