import { CartContext } from "@/components/ui/navbar/Cart/CartContext";
import { useContext } from "react";

export function useCart() {
    const context = useContext(CartContext);
  
    if (context === undefined) {
      throw new Error("useCart must be used inside of an CartProvider");
    }
  
    return context;
  }