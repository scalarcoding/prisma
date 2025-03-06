import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM,
    CLEAR_CART,
    CartAction,
  } from "./cart_actions";
import { WarehouseRequisitionCart } from "./wr_cart_model";
  
  
  interface CartState {
    items: WarehouseRequisitionCart[];
  }
  
  const initialState: CartState = {
    items: [],
  };
  


  export const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
    switch (action.type) {
      case ADD_TO_CART:
        // Check if the item already exists in the cart
        { const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem) {
          // Update the `order_qty` if item already exists
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, order_qty: (item.order_qty || 0) + (action.payload.order_qty || 0) }
                : item
            ),
          };
        }
        // Add a new item to the cart
        return {
          ...state,
          items: [...state.items, action.payload],
        }; }
  
      case REMOVE_FROM_CART:
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
  
      case UPDATE_CART_ITEM:
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          ),
        };
  
      case CLEAR_CART:
        return initialState;
  
      default:
        return state;
    }
  };
  