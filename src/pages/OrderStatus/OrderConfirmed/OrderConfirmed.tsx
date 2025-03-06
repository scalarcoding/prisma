import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TbPrinter, TbShoppingBagCheck } from "react-icons/tb";
import { WarehouseRequisitionRetrieve } from "../OrdersRetrievalModel";
import { DNA } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { supabase } from "@/api/repository/supabase";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { hours } from "@/pages/Cart/deliverySchedule";

const OrderConfirmed: React.FC = () => {
  const { district, wrNumber } = useParams();
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true);

  const [warehouseRequisitionRetrieve, setWarehouseRequisitionRetrieve] =
    useState<WarehouseRequisitionRetrieve>();

  useEffect(() => {
    console.log(district);
    console.log(wrNumber);

    const getWRFromServer = async () => {
      const { data, error } = await supabase.rpc(
        "get_warehouse_requisition_by_wr_number",
        { p_district: district, p_wr_number: wrNumber }
      );

      if (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
          action: <ToastAction altText="Empty PO Items">OK</ToastAction>,
        });
      }
      console.log(data);

      setWarehouseRequisitionRetrieve(data[0]);
      setIsLoading(false);
    };

    getWRFromServer();
  }, [district, toast, wrNumber]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      {isLoading ? (
        <DNA></DNA>
      ) : (
        <div className="mt-1 max-w-lg w-full bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Success Message */}
          <div className="flex flex-col items-center gap-0 justify-center ">
            {/* <div className="flex flex-row items-center gap-8 justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800">
                Order Confirmed!
              </h1>
            </div> */}
            <p className="text-muted-foreground text-lg font-bold">Warehouse Requisition</p>
          </div>

          <Separator />

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
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

          <Separator />

          {/* Items Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Items</h2>
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehouseRequisitionRetrieve && warehouseRequisitionRetrieve.items.sort((a, b) => a.item_number - b.item_number).map((item) => (
                  <TableRow key={item.item_number}>
                    <TableCell>{item.item_number}</TableCell>
                    <TableCell>
                      <div>{item.item_description}</div>
                      <div className="text-slate-400">{item.reg_number}</div>
                    </TableCell>
                    <TableCell>{item.order_qty}</TableCell>
                    <TableCell>Rp{item.inventory_cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          {/* Navigation */}
          <div className="navigation__buttons flex flex-col md:flex-row gap-2">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => alert("Redirect to orders")}
            >
              <TbPrinter />
              <span>Print Ticket</span>
            </Button>
            <Button
              variant="default"
              className="w-full"
              onClick={() => (window.location.href = "/order/list")}
            >
              <TbShoppingBagCheck />
              <span>View My Orders</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmed;
