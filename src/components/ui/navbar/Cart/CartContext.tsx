import React, { createContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";
import { WarehouseRequisitionCart } from "./wr_cart_model";
import { CartAction } from "./cart_actions";

interface CartContextType {
  state: { items: WarehouseRequisitionCart[] };
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
