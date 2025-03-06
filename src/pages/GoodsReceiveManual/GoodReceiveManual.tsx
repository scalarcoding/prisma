import { useState, ChangeEvent } from "react";
import {  TbPlus, TbTag } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputWithIcon from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
import { Combobox } from "../../components/ui/combobox/ComboBox";
import { CalendarForm } from "../../components/ui/dateinput/DateInput";
import { FormProvider, useForm } from "react-hook-form";
import InputWithPopoverAndClear from "@/components/ui/inputwithpopoverandclear";
import RegNumberSearchPanel from "../GoodsReceive/atomic/RegNumberSearchPanel";
import PoNumberSearchPanel from "../GoodsReceive/atomic/PoNumberSearchPanel";

// Define the Inventory type
type Inventory = {
  reg_number: number;
  description: string;
  po_number: string;
  qty_order: number;
  rcv_qty: number;
};

// Simulated warehouse data
const warehouses = ["WH01", "WH02", "WH03", "WH04"];

export default function GoodsReceiveManual(): JSX.Element {
  const [items, setItems] = useState<Inventory[]>([]);
  const [receiveDate, setReceiveDate] = useState<Date | null>(null);
  const [storesperson, setStoresperson] = useState<string>("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const methods = useForm(); // Initializes the form

  const [regNumberInput, setRegNumberInput] = useState<string>("");
  const [poNumberInput, setPoNumberInput] = useState<string>("");
  const [qtyOrderInput, setQtyOrderInput] = useState<string>("");
  const [qtyReceiveInput, setQtyReceiveInput] = useState<string>("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const addItem = () => {
    if (!regNumberInput || !poNumberInput || !qtyReceiveInput) {
      alert("Please fill in all fields.");
      return;
    }

    const newItem: Inventory = {
      reg_number: Number(regNumberInput),
      description: "Goods Ordered", // You can replace this with an actual description input
      po_number: poNumberInput,
      qty_order: Number(qtyOrderInput), // This could also be dynamically set if needed
      rcv_qty: Number(qtyReceiveInput),
    };

    setItems((prev) => [...prev, newItem]);

    // Reset inputs
    setRegNumberInput("");
    setPoNumberInput("");
    setQtyOrderInput("");
    setQtyReceiveInput("");
  };

  const handleRcvQtyChange = (index: number, value: string): void => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        rcv_qty: Number(value), // Ensure numeric input
      };
      return updated;
    });
  };

  const handleSubmit = (): void => {
    console.log("Submitted data:", {
      items,
      receiveDate,
      storesperson,
      selectedWarehouse,
    });
    // Add logic to send data to the backend
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <h1 className="text-xl font-semibold">
            Manual Receive Purchase Order
          </h1>
        </CardHeader>
        <CardContent>
          {/* Manually Add Items */}
          <div className="">
            {/* Reg Number Input */}
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="ponumber">
                <Label htmlFor="poNumber">PO Number</Label>
                <InputWithPopoverAndClear
                  id="poNumber"
                  placeholder="Enter PO Number"
                  onChange={handleInputChange(setPoNumberInput)}
                  value={poNumberInput}
                  prefixPopoverContent={<PoNumberSearchPanel startState={true} outstandingOnly={false} oncheckedchange={(e)=>console.log(e)
                  }/>}
                  onClear={() => console.log("Input cleared")}
                />
              </div>

              <div className="regnumber">
                <Label htmlFor="regNumber">Reg Number</Label>

                <InputWithPopoverAndClear
                  id="regNumber"
                  placeholder="Enter Reg Number"
                  onChange={handleInputChange(setRegNumberInput)}
                  value={regNumberInput}
                  prefixPopoverContent={<RegNumberSearchPanel/>}
                  onClear={() => console.log("Input cleared")}
                />
              </div>
            </div>

            {/* Qty Receive Input */}
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 items-end justify-end">
              <div className="qtyorder">
                <Label htmlFor="qtyOrder">Qty Order</Label>
                <InputWithIcon
                  id="qtyOrder"
                  placeholder="Enter Quantity Order"
                  iconPosition="suffix"
                  icon={<TbTag />}
                  value={qtyOrderInput}
                  onChange={handleInputChange(setQtyOrderInput)}
                />
              </div>
              <div className="qtyreceive">
                <Label htmlFor="qtyReceive">Qty Receive</Label>
                <InputWithIcon
                  id="qtyReceive"
                  placeholder="Enter Quantity Received"
                  iconPosition="suffix"
                  icon={<TbTag />}
                  value={qtyReceiveInput}
                  onChange={handleInputChange(setQtyReceiveInput)}
                />
              </div>
            </div>

            <div className="mt-2 add__button">
              <Button
                onClick={addItem}
                className="button__add-btn"
                variant="outline"
              >
                <TbPlus />
              </Button>
            </div>

            {/* Items Table */}
            <div className="mt-4">
              <h2 className="text-lg font-medium mb-2">Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2">
                        PO Number
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        PO Item
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Reg Number
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Description
                      </th>

                      <th className="border border-gray-200 px-4 py-2">
                        Qty Order
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-center">
                        Rcv Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.reg_number} className="even:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">
                          {item.po_number}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {item.reg_number}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {item.description}
                        </td>

                        <td className="border border-gray-200 px-4 py-2">
                          {item.qty_order}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <Input
                            type="number"
                            value={item.rcv_qty}
                            onChange={(e) =>
                              handleRcvQtyChange(index, e.target.value)
                            }
                            className="w-16 text-center"
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
                          onChange={(date) => setReceiveDate(date)} // Will receive either Date or null
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

                  {/* Warehouse Selection */}
                  <div className="mt-4 flex flex-col w-full col-span-1">
                    <Label htmlFor="warehouse">Warehouse</Label>
                    <div className="flex w-full">
                      <Combobox
                        value={selectedWarehouse}
                        onChange={setSelectedWarehouse}
                        options={warehouses.map((code) => ({
                          label: code,
                          value: code,
                        }))}
                        placeholder="Select Warehouse"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button onClick={handleSubmit} className="mt-4 w-full">
                  Receive PO
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
