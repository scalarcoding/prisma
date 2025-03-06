import { useState, ChangeEvent } from "react";
import { TbQrcode, TbSearch } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputWithIcon from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
// import { Combobox } from "../../components/ui/combobox/ComboBox";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarForm } from "../../components/ui/dateinput/DateInput";
import { FormProvider, useForm } from "react-hook-form";
import { supabase } from "@/api/repository/supabase";
import { useToast } from "@/hooks/use-toast";
import { PurchaseOrder } from "@/types/purchase_order/purchase-order";
import { ToastAction } from "@/components/ui/toast";

// Simulated warehouse data
// const warehouses = ["WH01", "WH02", "WH03", "WH04"];

type InputState = "init" | "loading" | "found" | "notFound" | "invalid";

export default function GoodsReceive(): JSX.Element {
  const [poNumber, setPoNumber] = useState<string>("");
  const [inputState, setInputState] = useState<InputState>("init");
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>();
  const [receiveDate, setReceiveDate] = useState<Date | null>(null);
  const [storesperson, setStoresperson] = useState<string>("");
  // const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const methods = useForm(); // Initializes the form
  const { toast } = useToast();
  // const { user } = useAuth();

  const handleRcvQtyChange = (poItem: number, value: string): void => {
    if (!value || value === "") return;

    setPurchaseOrder((prev) => {
      if (!prev) return prev; // Handle the case where prev is undefined
      const updated: PurchaseOrder = { ...prev }; // Create a shallow copy of the `purchaseOrder` object
      const updatedItems = [...(updated.items || [])]; // Copy the `items` array

      // Find the index of the item to update
      const itemIndex = updatedItems.findIndex(
        (item) => item.poItem === poItem
      );

      if (itemIndex !== -1) {
        // Update the specific item at the found index
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          qty_receive: value, // Update the `qty_receive` field as a string
        };
      }

      updated.items = updatedItems; // Assign the updated items back to the purchase order
      return updated;
    });
  };

  const handleCheckedChange = (poItem: string) => {
    setPurchaseOrder((prev) => {
      if (!prev || !prev.items) return prev;
      return {
        ...prev,
        items: prev.items.map((item) =>
          item.poItem === parseInt(poItem)
            ? { ...item, toReceive: !item.toReceive }
            : item
        ),
      };
    });
  };

  const handleToggleAllReceive = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked; // Get the new checked value (true/false)

    setPurchaseOrder((prev) => {
      if (!prev) return prev; // Handle the case where prev is undefined
      const updated = { ...prev };
      if (updated.items) {
        updated.items = updated.items.map((item) => ({
          ...item,
          toReceive: newValue, // Update the toReceive value for each item
        }));
      }
      return updated;
    });
  };

  const handleValidateForm = (): boolean => {
    console.log("Purchase Order Items:", purchaseOrder?.items);

    // Check if there is any item to receive
    if (
      purchaseOrder?.items?.every(
        (item) => item.toReceive === false || !item.toReceive
      )
    ) {
      toast({
        title: "No Item To Receive",
        variant: "destructive",
        description: "Please Receive at least one item",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
      return false; // Validation failed
    }

    // Check if any item's qty_receive is null or empty
    if (
      purchaseOrder?.items?.some(
        (item) => item.qty_receive == null || item.qty_receive === ""
      )
    ) {
      toast({
        title: "Qty not filled",
        variant: "destructive",
        description: "Please fill all the Qty Receive",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
      return false; // Validation failed
    }

    // Check if receiveDate is empty or null
    if (!receiveDate) {
      toast({
        title: "Receive date not filled",
        variant: "destructive",
        description: "Please fill the Receive Date",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
      return false; // Validation failed
    }

    // Check if storesperson is empty or undefined
    if (!storesperson || storesperson.trim() === "") {
      toast({
        title: "Storesperson not filled",
        variant: "destructive",
        description: "Please fill the Storesperson",
        action: <ToastAction altText="Close">OK</ToastAction>,
      });
      return false; // Validation failed
    }

    return true; // All validations passed
  };

  const handleSubmit = (): void => {
    // Run form validation
    const isValid = handleValidateForm();

    // If validation fails, do not proceed
    if (!isValid) {
      return;
    }

    // Proceed with form submission logic
    console.log(purchaseOrder);

    toast({
      title: "Success",
      variant: "default",
      description: "Purchase Order Received Successfully",
      action: <ToastAction altText="Close">OK</ToastAction>,
    });

    // Add logic to create the TransactionReceivePO object and send it to Supabase
  };

  const handleInputChange =
    (callback: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase(); // Convert input to uppercase
      callback(value); // Update the passed-in state or handler
      setStoresperson(value); // Update the storesperson state
    };

  const handlePONumberChange =
    (callback: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase(); // Convert input to uppercase
      callback(value); // Update the passed-in state or handler
      setPoNumber(value); // Update the storesperson state
    };

  const handleSearchPO = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setInputState("loading");

    if (!poNumber) {
      setInputState("invalid");
      return;
    }

    const getPurchaseOrder = async () => {
      const { data, error } = await supabase.rpc(
        "get_single_purchase_orders_with_items",
        { p_po_number: poNumber }
      );

      if (error) {
        console.error(error.message);
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
        });
        return;
      }

      if (!data || data.length === 0) {
        // alert('notfound')
        setInputState("notFound");
        return;
      }
      const poData = data as PurchaseOrder;

      console.log(poData.items);
      setPurchaseOrder(poData);
      setInputState("found");
    };

    getPurchaseOrder();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-xl font-semibold">Receive Purchase Order</h1>
        </CardHeader>
        <CardContent>
          {/* Purchase Order Number */}
          <div className="pb-4">
            <form
              action="submit"
              onSubmit={handleSearchPO}
              className="flex items-end gap-2"
            >
              <div className="ponumberinput flex flex-col w-full">
                <Label htmlFor="poNumber">Purchase Order Number</Label>
                <InputWithIcon
                  autoFocus
                  onChange={handlePONumberChange(setPoNumber)}
                  value={poNumber}
                  id="poNumber"
                  placeholder="Enter PO Number or Scan QR Code"
                  iconPosition="suffix"
                  icon={<TbQrcode />}
                />
              </div>
              <Button variant="secondary" className="">
                <TbSearch />
              </Button>
            </form>

            {/* Items State Handling */}
            <div className="mt-2">
              {inputState === "init" && (
                <p className="text-gray-500">
                  Please enter a PO number or Scan the QR Code to search.
                </p>
              )}
              {inputState === "loading" && (
                <div>
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              )}
              {inputState === "notFound" && (
                <p className="text-red-500 font-semibold">
                  Purchase order not found.
                </p>
              )}
              {inputState === "invalid" && (
                <p className="text-red-500 font-semibold">
                  Enter the valid PO Number
                </p>
              )}
              {inputState === "found" && (
                <div className="mt-4">
                  <h2 className="text-lg font-medium mb-2">Items</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 text-left">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-200 px-4 py-2 text-center">
                            <input
                              checked={purchaseOrder?.items?.every(
                                (item) => item.toReceive === true
                              )}
                              onChange={handleToggleAllReceive}
                              type="checkbox"
                              className="form-checkbox"
                            />
                          </th>
                          <th className="border border-gray-200 px-4 py-2">
                            Reg Number
                          </th>
                          <th className="border border-gray-200 px-4 py-2">
                            Description
                          </th>
                          <th className="border border-gray-200 px-4 py-2">
                            Part Number
                          </th>
                          <th className="border border-gray-200 px-4 py-2">
                            Qty Order
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-center">
                            Rcv Qty
                          </th>
                          <th className="border border-gray-200 px-4 py-2 text-center">
                            Complete<br></br>Remaining
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseOrder?.items!.map((item) => (
                          <tr
                            key={item.poItemId}
                            className={`even:bg-gray-50 ${
                              item.toReceive === false ? "opacity-15" : ""
                            }`}
                          >
                            <td className="border border-gray-200 px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={item.toReceive}
                                onChange={() =>
                                  handleCheckedChange(item.poItem.toString())
                                }
                                className="form-checkbox"
                              />
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {item.regId}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {item.description}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {item.partNumber}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                              {item.qty_order}
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center">
                              <Input
                                disabled={!item.toReceive}
                                type="number"
                                value={item.qty_receive || ""}
                                onChange={(e) =>
                                  handleRcvQtyChange(
                                    item.poItem,
                                    e.target.value
                                  )
                                }
                                className="w-16 text-center"
                              />
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={item.toReceive}
                                onChange={() =>
                                  handleCheckedChange(item.poItem.toString())
                                }
                                className="form-checkbox"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                      {/* Receive Date */}
                      <div className="col-span-1">
                        <FormProvider {...methods}>
                          <form>
                            <CalendarForm
                              value={receiveDate}
                              onChange={(date) => setReceiveDate(date)}
                              title="Receive Date"
                              description="Arrival goods date"
                            />
                          </form>
                        </FormProvider>
                      </div>

                      {/* Storesperson */}
                      <div className="col-span-1">
                        <Label htmlFor="storesperson">Storesperson</Label>
                        <Input
                          id="storesperson"
                          placeholder="Enter Storesperson Name"
                          value={storesperson}
                          onChange={handleInputChange(setStoresperson)}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button onClick={handleSubmit} className="mt-4 w-full">
                      Receive PO
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
