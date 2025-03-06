
import { AddItemPayload, WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
import { PostgreError } from "@/context/postgreError";
import { CurrentUser } from "@/types/user";


export interface AuthContextType {
    user: CurrentUser | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    addItemToCart: (item: AddItemPayload) => Promise<{ data: WarehouseRequisitionCart | null; error: PostgreError | null }>;
    deleteItemFromCart: (cartId: number, userId: string) => void;
    modifyItemInCart: (cartId: number, quantity: number,inv_value:number) => void;
    setCartItemEstimationValue: (userId:string, itemNumber: number, estimatedValue: number, qty:number) => void;
    
  }
  