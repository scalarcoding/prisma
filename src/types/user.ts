import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
import { CataloguePrivilege, POPrivilege, PRPrivilege, WRPrivilege } from "./privileges/privileges";

export interface User {
    userid:string;
    name?: string;
    email?: string;
    password: string;
  }


  export interface CurrentUser {
    userid:string;
    email?:string;
    district:string[];
    lastActiveDistrict:string;
    isSessionActive:boolean;
    poPrivilege?:POPrivilege
    prPrivilege?:PRPrivilege,
    wrPrivilege?:WRPrivilege,
    cataloguePrivilege?:CataloguePrivilege,
    cart: WarehouseRequisitionCart[] | undefined;
  }