export interface WarehouseRequisitionItemRetrieve {
    item_number: number;
    item_description:string;
    reg_number: number;
    order_qty: number;
    inventory_value: number;
    inventory_cost: number;
    item_notes: string;
    supplied_qty: number;
    pending_qty:number;
    soh: number | null;
    supply_status:number | null;
  }
  
  export interface WarehouseRequisitionRetrieve {
    wr_number: string;
    district: string;
    drop_point: string;
    receiver_id: string;
    delivery_schedule: number;
    ordered_by_id: string;
    issuing_cost: number;
    status: string;
    items: WarehouseRequisitionItemRetrieve[]; // Array of warehouse requisition items 
  }

  