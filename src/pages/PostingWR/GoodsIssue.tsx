import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { TbCameraCode, TbQrcode } from "react-icons/tb";
import { WarehouseRequisitionRetrieve } from "../OrderStatus/OrdersRetrievalModel";
import { ToastAction } from "@/components/ui/toast";
import { getWRFromServer } from "@/api/orderstatus/get_wr_from_server";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { hours } from "../Cart/deliverySchedule";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TripleToggle from "@/components/ui/TripleToggle/TripleToggle";
import { ReusableAlertDialog } from "@/components/ui/alert/ReusableAlertDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/api/repository/supabase";

interface SupplyQty {
  to_issue: boolean;
  id: number;
  reg_number: number;
  order_qty: number;
  supply_qty?: number | null;
  supply_status: number;
  pending_qty:number;
  supplied_qty:number;
  soh:number;
}

const GoodsIssue = () => {
  const [wrNumber, setWrNumber] = useState<string>("");
  const [warehouseRequisitionRetrieve, setWarehouseRequisitionRetrieve] =
    useState<WarehouseRequisitionRetrieve | null>(null);
  const [supplyQty, setSupplyQty] = useState<SupplyQty[]>([]);
  const [qty, setQty] = useState<number | string>("");
  const [ wrCompleted, setWRCompleted ] = useState<boolean>(false);

  const { user } = useAuth();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheckWR = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user!.lastActiveDistrict);
    console.log(wrNumber);

    await getSingleWRFromServer();
  };

  const handleWrNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrNumber(e.target.value);
  };

  const handleChangeSupplyStatus = (status: number, item_number: number) => {
    setSupplyQty((prev) =>
      prev.map((item) =>
        item.id == item_number ? { ...item, supply_status: status } : item
      )
    );
  };

  const getSingleWRFromServer = async () => {
    if (user?.lastActiveDistrict) {
      try {
        const data = await getWRFromServer(
          user.lastActiveDistrict,
          wrNumber.toUpperCase()
        );

        

        if (data) {

          console.log(data);
          

          const dataSupply: SupplyQty[] = [];
          data.items.forEach((item) => {
            dataSupply.push({
              id: item.item_number,
              reg_number: item.reg_number,
              order_qty: item.order_qty,
              supply_qty: null,
              supply_status: getInitial(item.soh, item.order_qty),
              to_issue: item.pending_qty==0? false : true,
              pending_qty: item.pending_qty,
              supplied_qty: item.supplied_qty?? 0,
              soh: item.soh!,
            });
          });
           
          const wrComplete = dataSupply.every(item => item.to_issue !==true);
          setWRCompleted(wrComplete)

          setWarehouseRequisitionRetrieve(data);
          setSupplyQty(dataSupply);

          console.log(dataSupply);
        } else {
          setWarehouseRequisitionRetrieve(null);
        }
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: String(error),
          action: <ToastAction altText="Close">OK</ToastAction>,
        });
      }
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: "User's last active district is not available.",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
    }
  };

  const handleConfirmIssueGoods = async () => {

    if(supplyQty.every((item)=>item.to_issue==false)){
      toast({
        title: "Error",
        variant: "destructive",
        description:
          "No item to issue",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
      return;
    }

    const sendQtySupply = supplyQty.filter((item) => item.to_issue);

    sendQtySupply.forEach(element => {

      //Final check for cancel supply
      if(element.supply_qty===null && element.soh<1){
        element.supply_qty= 0;
        element.pending_qty = 0;
        element.supply_status = 1; //cancel supply
      }
      //Final check for full supply
      if(element.supply_qty==null && element.supply_status==0){
        element.supply_qty = element.pending_qty;
        element.supplied_qty = element.supplied_qty + element.supply_qty;
        element.soh = element.soh - element.pending_qty; //decrease soh
        element.pending_qty = 0;
      }

      //Final check for partial supply
      if(element.supply_status==2){
        console.log(element.soh);
        console.log(element.supplied_qty);
        
        element.soh = element.soh - element.supply_qty!; //decrease soh

      }




    });

    //make validation for the supply_qty null. If there is present, make an error toast
    const hasNullSupplyQty = sendQtySupply.some(
      (item) => item.supply_qty === null
    );

    if (hasNullSupplyQty) {
      toast({
        title: "Error",
        variant: "destructive",
        description:
          "Some items have null supply quantity. Please check and try again.",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
      return;
    }

    console.log(sendQtySupply);

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    let attempt = 0;
    const maxAttempts = 10;

    let areStockCodeNotLocked = null;

    do {
      console.log("Trying to check if the Stock Code has a lock token");
      const { data, error } = await supabase.rpc("are_lock_tokens_null", {
        p_items: sendQtySupply,
        p_district: user?.lastActiveDistrict,
      });

      if (error) {
        console.log(error);
        break;
      }

      areStockCodeNotLocked = data;
      console.log(areStockCodeNotLocked);

      if (areStockCodeNotLocked == true) break;

      // Wait for 2 seconds before retrying
      await delay(2000);
      attempt++;
      // Check if max attempts have been reached
      if (attempt >= maxAttempts) {
        toast({
          title: "Lock Token Still Exists",
          variant: "destructive",
          description: "The Stock Code is locked. Please try again later.",
        });
        return;
      }
    } while (areStockCodeNotLocked != true);



    console.log("Lock token no longer exists. Proceeding to the next step...");

    //Lock the stock codes with our token
    const token = localStorage.getItem("token");
    const { error } = await supabase.rpc("lock_district_stock_item", {
      p_items: sendQtySupply,
      p_lock_token: token,
      p_district: user?.lastActiveDistrict,
    });

    if (error) {
      console.log(error);
    }
    console.log('Successfully locked the stock codes');

    //1. Update the warehouse_requisition_items
    const parameter = {
      p_items: sendQtySupply,
      p_district: user?.lastActiveDistrict,
      p_wr_number: wrNumber.toUpperCase(),
    };

    console.log(parameter);
    
    const { data : updateSupplyData, error : updateSupplyError } = await supabase.rpc("update_supply_qty_and_status", parameter);

    if (updateSupplyError) {
      console.log(updateSupplyError);
    }

    console.log(updateSupplyData);
    

    setWarehouseRequisitionRetrieve(null);
    setWrNumber("");
    // Set focus back to the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
    toast({
      title: "Issue Goods Success",
      variant: "default",
      description: "Goods Issue Success",
      action: <ToastAction altText="Close">OK</ToastAction>,
    });
  };

  const handleChangeSupplyQtyInput = (
    e: React.FormEvent,
    itemNumber: number
  ) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Item Number:", itemNumber);
    console.log("Entered Partial Supply Qty:", qty);

    const item = warehouseRequisitionRetrieve?.items.find(
      (item) => item.item_number == itemNumber
    );

    //Reject if the provided qty supply exceeds stock on hand
    if (item && (item.soh !== undefined && item.soh! < Number(qty) || Number(qty) > item.pending_qty )) {
      toast({
        title: "Supply Qty Exceeds SOH",
        variant: "destructive",
        description: "Please input the valid Supply Qty",
        action: <ToastAction altText="Empty Register Number">OK</ToastAction>,
      });
      return;
    }


    //If qty supply is 0, then it considered as cancel supply, then fill the supply status to 1 and pending order to 0.
    if (Number(qty) == 0) {
      //If Qty supply fulfills remaining order qty, change to full supply ( 0 )
      setSupplyQty( (prev) =>
        prev.map((item) => {
          if (item.id === itemNumber) {
            return {
              ...item,
              supply_qty: 0, // Update current supply quantity
              supply_status: 1, // 1 = Cancel Supply
              pending_qty: 0
            };
          }
          return item;
        })
      );
    }

    else{

        //If Qty supply fulfills remaining order qty, change to full supply ( 0 )
        setSupplyQty( (prev) =>
          prev.map((item) => {
            if (item.id === itemNumber) {
              // Calculate new supplied_qty
              const newSuppliedQty = (item.supplied_qty || 0) + Number(qty);
              const newPendingQty = Math.max(0, item.pending_qty - Number(qty));
              return {
                ...item,
                supply_qty: Number(qty), // Update current supply quantity
                supply_status: newPendingQty > 0 ? 2 :0, // 0 = Full supply
                supplied_qty: newSuppliedQty, // Update total supplied quantity
                pending_qty:newPendingQty,
              };
            }
            return item;
          })
        );
      } 

    setTimeout(() => {
      console.log(item);
    }, 2000);
    

    setQty("");
  };

  function getInitial(soh: number | null, order_qty: number): number {
    if (soh === null || soh === 0) {
      return 1; // No stock on hand, set to 'Not Supplied'
    } else if (soh >= order_qty) {
      return 0; // Enough stock on hand, set to 'Fully Supplied'
    } else {
      return 2; // Partial supply
    }
  }
  const handleChangeCheckboxToIssue = (
    item_number: number
  ) => {
    setSupplyQty((prev) =>
      prev.map((item) =>
        item.id === item_number ? { ...item, to_issue: item.pending_qty==0? item.to_issue : !item.to_issue } : item
      )
    );
  };

  function formatRowBySupplyStatus(supply_status: number | null) {
    const baseFormat = "opacity-50"
    switch (supply_status) {
      case 0:
        return `${baseFormat} bg-green-100 hover:bg-green-100`; // Fully Supplied
      case 1:
        return `${baseFormat}  bg-red-100 hover:bg-red-100`; // Not Supplied / Cancelled
      default:
        return "";
    }
  }
  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Goods Issue</h2>
        <div className="po__number-container mb-4">
          <Label className="block mb-2">WR Number</Label>
          <div className="input__container flex gap-1">
            <form onSubmit={handleCheckWR} className="w-full">
              <Input
                ref={inputRef}
                value={wrNumber}
                onChange={handleWrNumberChange}
                autoFocus
                placeholder="Enter WR Number and Press Enter"
                type="text"
                name="wrNumber"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 uppercase"
              />
            </form>
            <Button variant="ghost">
              <TbCameraCode></TbCameraCode>
            </Button>
            <Button variant="ghost">
              <TbQrcode></TbQrcode>
            </Button>
          </div>
        </div>

        {warehouseRequisitionRetrieve && (
          <div className="order__status">
            <Separator />

            {/* Order Details */}
            <div className="grid grid-cols-2 gap-4 text-sm py-2">
              <div className="flex flex-col">
                <span className="font-medium">WR Number:</span>
                <p>{warehouseRequisitionRetrieve?.wr_number}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Drop Point:</span>
                <p>{warehouseRequisitionRetrieve?.drop_point}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Receiver:</span>
                <p>{warehouseRequisitionRetrieve?.receiver_id}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Schedule:</span>
                <p>
                  {warehouseRequisitionRetrieve?.ordered_by_id !== undefined
                    ? hours[warehouseRequisitionRetrieve.delivery_schedule]
                        ?.label || "N/A"
                    : "N/A"}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Ordered By:</span>
                <p>{warehouseRequisitionRetrieve?.ordered_by_id}</p>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Status</span>
                <p>{warehouseRequisitionRetrieve?.status}</p>
              </div>
            </div>

            {warehouseRequisitionRetrieve?.status === "approved" && (
              <div className="wr__items py-2">
                <div className="add__item border border-solid rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold mb-4">WR Items</h3>
                  <Table className="w-full text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead className="text-center hidden md:inline-flex items-center justify-center">Qty Order</TableHead>
                        <TableHead className="text-center">Remaining</TableHead>
                        <TableHead className="text-center">SOH</TableHead>
                        <TableHead className="text-center">
                          Qty Supply
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warehouseRequisitionRetrieve &&
                        warehouseRequisitionRetrieve.items
                          .sort((a, b) => a.item_number - b.item_number)
                          .map((item) => (
                            <TableRow key={item.item_number} className={`${ formatRowBySupplyStatus(item.supply_status) }`}>
                              <TableCell>
                                <Checkbox
                                  onCheckedChange={() =>
                                    handleChangeCheckboxToIssue(
                               
                                      item.item_number
                                    )
                                  }
                                  checked={
                                    supplyQty.find(
                                      (thisitem) =>
                                        thisitem.id == item.item_number
                                    )?.to_issue
                                  }
                                  id={item.item_number.toString()}
                                ></Checkbox>
                              </TableCell>
                              <TableCell>{item.item_number}</TableCell>
                              <TableCell>
                                <div>{item.item_description}</div>
                                <div className="text-slate-400">
                                  {item.reg_number}
                                </div>
                              </TableCell>
                              <TableCell className="">
                                <div className="justify-center order_qty flex items-center h-full text-center">
                                  {item.order_qty}
                                </div>
                              </TableCell>
                              <TableCell className=" ">
                                <div className="justify-center order_qty flex items-center h-full text-center">
                                  {item.pending_qty}
                                </div>
                              </TableCell>
                              <TableCell className=" ">
                                <div className="justify-center order_qty flex items-center h-full text-center">
                                  {item.soh}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="action">
                                  <TripleToggle
                                    enabled={
                                      supplyQty.find(
                                        (thisitem) =>
                                          thisitem.id == item.item_number
                                      )?.to_issue ?? true
                                    }
                                    initial={getInitial(
                                      item.soh,
                                      item.order_qty
                                    )}
                                    id={item.item_number}
                                    onChange={(e) =>
                                      handleChangeSupplyStatus(
                                        e,
                                        item.item_number
                                      )
                                    }
                                  />
                                  {supplyQty.find(
                                    (s) => s.id === item.item_number
                                  )?.supply_status === 2 && (
                                    <form
                                      onSubmit={(e) =>
                                        handleChangeSupplyQtyInput(
                                          e,
                                          item.item_number
                                        )
                                      }
                                    >
                                      <Input
                                        disabled={
                                          !supplyQty.find(
                                            (thisitem) =>
                                              thisitem.id == item.item_number
                                          )?.to_issue
                                        }
                                        className={
                                          supplyQty.find(
                                            (s) => s.id === item.item_number
                                          )?.supply_qty
                                            ? "hidden"
                                            : "block"
                                        }
                                        id={item.item_number.toString()}
                                        onChange={(e) => setQty(e.target.value)}
                                        value={qty}
                                        placeholder="Enter Partial Supply Qty and Press Enter"
                                      />
                                    </form>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </div>
                { !wrCompleted && (<ReusableAlertDialog
                  triggerText={"Submit"}
                  title={"Confirm Issue Goods"}
                  description={"Yakin untuk mengeluarkan barang ini?"}
                  cancelText={"Cancel"}
                  actionText={"Ok"}
                  onAction={handleConfirmIssueGoods}
                />) }
              </div>
            )
            
            }

            {warehouseRequisitionRetrieve.status !== "approved" &&
              warehouseRequisitionRetrieve.status !== "rejected" && (
                <div className="flex justify-center">
                  <h1 className="text-lg text-orange-400">
                    Your Requisitions in on approval progress
                  </h1>
                </div>
              )}
            {warehouseRequisitionRetrieve.status === "rejected" && (
              <div className="flex justify-center">
                <h1 className="text-lg text-red-600">
                  Your Requisitions Has Been Rejected
                </h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoodsIssue;
