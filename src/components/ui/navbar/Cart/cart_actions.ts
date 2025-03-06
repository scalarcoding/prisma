import { WarehouseRequisitionCart } from "./wr_cart_model";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
const CLEAR_CART = "CLEAR_CART";


  type CartAction = {
    type: string;
    payload: WarehouseRequisitionCart;
  }

export { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART };
export type { CartAction };

