import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  PurchaseOrder,
  PurchaseOrderItem,
} from "@/types/purchase_order/purchase-order";
// import {
//   createPurchaseOrder,
//   createPurchaseOrderItems,
// } from "@/api/purchaseorder/purchase-order-create";
import { getCatalogueByRegNumber } from "@/api/catalogue/get-description-by-rn";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { ReusableAlertDialog } from "@/components/ui/alert/ReusableAlertDialog";
import { Textarea } from "@/components/ui/textarea";
import { generateNumberCombination } from "@/functions/generatePONumber";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import insertPurchaseOrderWithNextPo from "@/api/purchaseorder/purcase-order-create-rpc";
import { supabase } from "@/api/repository/supabase";
import { fetchMainWarehouse } from "@/functions/fetchAllwarehouseInDistrict";

const CreatePO = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [poData, setPoData] = useState<PurchaseOrder>({
    poNumber: "",
    supplierId: "",
    grandTotal: 0,
    createdAt: new Date().toISOString(),
    dueDate: "",
    deliveryPointId: "",
    taxes: 0,
    shippingRate: 0,
    insurance: 0,
    paymentTerms: "",
    paymentMethods: "",
    paymentDescription: "",
    poNarrative: "",
    shippingMethod: "",
    netTotal: 0,
    discount: 0,
    district: user!.lastActiveDistrict,
    lockToken: localStorage.getItem('token'),
    warehouseId: "",
    purchaserId: "",
  });

  const [poItems, setPoItems] = useState<PurchaseOrderItem[]>([]);
  const [generatedPoNumber, setGeneratedPoNumber] = useState<string>("");
  const [itemFound, setItemFound] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<PurchaseOrderItem>({
    poItemId: "",
    partNumber: "",
    poNumber: "",
    description: "",
    poItem: poItems.length + 1, // Automatically set based on array length
    regId: null, // New field for registration number
    qty_order: 0,
    heldAtBin: null,
    markPrice: 0,
    lastPrice: 0,
    subtotal: 0,
    itemDiscount: 0,
    itemInsurance: 0,
    itemNarrative: "",
    toReceive: false,
  });

  
  const regIdRef = useRef<HTMLInputElement>(null);
  const poNumberRef = useRef<HTMLDivElement>(null);

  const handleSearchRegNumber = async (e: React.FormEvent, regnum: string) => {
    e.preventDefault();

    if (!regnum) {
      console.error("Registration number is required");
      return;
    }

    const result = await getCatalogueByRegNumber(regnum);



    if ("error" in result) {
      // If the result contains an error
      console.error("Error:", result.error);
      setNewItem((prev) => ({
        ...prev,
        description: "Not Found",
      }));
    } else {
      // On successful response, update relevant fields in newItem
      console.log("Item Details:", result);
      setItemFound(true);
      setNewItem((prev) => ({
        ...prev,
        description: result.item_description || "No Description",
        held_at_bin: result.held_at_bin,
        partNumber: result.part_number,
        regId: parseInt(regnum),

      }));
    }
  };

  // const handlePoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPoData({
  //     ...poData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const calculateTotal = () => {
    const total = poItems.reduce((sum, item) => {
      return sum + item.subtotal;
    }, 0);
    setPoData((prevData) => ({ ...prevData, grandTotal: total }));
  };

  const handleNewItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof PurchaseOrderItem;
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setNewItem((prev) => {
      const updatedItem = {
        ...prev,
        [name]: value,
        poItem: poItems.length + 1, // Dynamically set item number
      };

      return {
        ...updatedItem,
        subtotal: updatedItem.markPrice * updatedItem.qty_order,
      };
    });
  };

  // const removeItem = (index: number) => {
  //   setPoItems((prevData) => ({
  //     ...prevData,
  //     items: prevData.filter((_, i) => i !== index),
  //   }));
  // };

  const addItem = () => {
    if (newItem.regId == null || !itemFound) {
      toast({
        title: "Register Number Is Empty",
        variant: "destructive",
        description:
          "Please input the valid Stock Register Number and Press Enter",
        action: <ToastAction altText="Empty Register Number">OK</ToastAction>,
      });
      return;
    }

    if (!newItem.qty_order || newItem.qty_order <= 0) {
      toast({
        title: "Invalid Order Qty",
        variant: "destructive",
        description: "Please input the valid Order Quantity",
        action: <ToastAction altText="Invalid Qty">OK</ToastAction>,
      });
      return;
    }

    if (!newItem.markPrice || newItem.markPrice <= 0) {
      toast({
        title: "Invalid Price",
        variant: "destructive",
        description: "Please input the valid Price",
        action: <ToastAction altText="Invalid Price">OK</ToastAction>,
      });
      return;
    }

    const existingItemIndex = poItems.findIndex(
      (item) => item.regId === newItem.regId
    );

    if (existingItemIndex !== -1) {
      // Check if the price differs
      if (poItems[existingItemIndex].markPrice !== newItem.markPrice) {
        toast({
          title: "Price Mismatch",
          variant: "destructive",
          description: `The entered price (${newItem.markPrice}) differs from the existing price (${poItems[existingItemIndex].markPrice}) for Reg ID ${newItem.regId}.`,
          action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
        });
        return;
      }

      // Update quantity and subtotal if price matches
      const updatedPoItems = [...poItems];
      updatedPoItems[existingItemIndex] = {
        ...updatedPoItems[existingItemIndex],
        qty_order:
          updatedPoItems[existingItemIndex].qty_order + newItem.qty_order,
        lastPrice: updatedPoItems[existingItemIndex].markPrice,
        subtotal:
          (updatedPoItems[existingItemIndex].qty_order + newItem.qty_order) *
          updatedPoItems[existingItemIndex].markPrice,
      };
      setPoItems(updatedPoItems);
    } else {
      // Add new item if no duplicate
      setPoItems([...poItems, newItem]);
    }

    // Reset form inputs
    setNewItem({
      poItemId: "",
      partNumber: "",
      poNumber: "",
      description: "",
      poItem: poItems.length + 2,
      regId: null,
      heldAtBin: null,
      markPrice: 0,
      lastPrice: 0,
      subtotal: 0,
      itemDiscount: 0,
      itemInsurance: 0,
      itemNarrative: "",
      qty_order: 0,
      toReceive: false
    });

    setItemFound(false);
    regIdRef.current?.focus();

    // Additional reset (if necessary)
    // setRegNumber('');
    // setDescription('');
  };

  useEffect(() => {
    // Recalculate total whenever poItems change
    calculateTotal();
  }, [poItems]);

  const handleSubmit = async () => {
    if (poItems.length <= 0) {
      toast({
        title: "PO item is empty",
        variant: "destructive",
        description: "Please add some items to Purchase Order",
        action: <ToastAction altText="Empty PO Items">OK</ToastAction>,
      });
      return;
    }

    let lastPo = null;

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    let attempt = 0;
    const maxAttempts = 10;
    
    do {
      console.log("Trying to check if the last PO has a lock token");
    
      // Check if the last PO has a lock token
      const { data, error } = await supabase
        .from("purchase_orders")
        .select("po_number, lock_token")
        .eq("district", user!.lastActiveDistrict)
        .order("id", { ascending: false })
        .limit(1);
    
      if (error) {
        console.error(error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "An error occurred while checking the purchase order. Please try again later.",
        });
        return;
      }
    
      if (!data || data.length === 0) {
        toast({
          title: "No Purchase Order",
          variant: "destructive",
          description: "No Purchase Orders found in the database.",
        });
        return;
      }
    
      lastPo = data[0];
      console.log(`Attempt ${attempt + 1}:`, lastPo);
    
      // Exit the loop if the lock_token is no longer present
      if (!lastPo.lock_token) break;
    
      // Wait for 2 seconds before retrying
      await delay(2000);
      attempt++;
    
      // Check if max attempts have been reached
      if (attempt >= maxAttempts) {
        toast({
          title: "Lock Token Still Exists",
          variant: "destructive",
          description: "The Purchase Order is locked. Please try again later.",
        });
        return;
      }
    } while (lastPo.lock_token);
    
    // Continue to the next line of code
    console.log("Lock token no longer exists. Proceeding to the next step...");
    // Add your next steps here





    const token = localStorage.getItem("token");
    const { error: updateError } = await supabase
      .from("purchase_orders")
      .update({ lock_token: token })
      .eq("po_number", lastPo.po_number);

    if (updateError) {
      console.error("Error updating lock token:", updateError.message);
      toast({
        title: "Update Error",
        variant: "destructive",
        description: "Failed to update the lock token. Please try again later.",
      });
      return;
    }




    try {
      // Generate the PO number
      const generatedPO = generateNumberCombination(lastPo.po_number, 4);
      console.log(generatedPO);

      const mainWarehouse = await fetchMainWarehouse({ district : user!.lastActiveDistrict })

      // Prepare updated `poData` with the generated PO number
      const updatedPoData = {
        ...poData,
        poNumber: generatedPO,
        lockToken : token,
        district : user!.lastActiveDistrict,
        purchaserId: user!.userid,
        warehouseId: mainWarehouse,
      };
      

      // Prepare updated `poItems` with the generated PO number
      const updatedPoItems = poItems.map((item) => ({
        ...item,
        poNumber: generatedPO,
        poItemId: `${generatedPO}/${String(item.poItem).padStart(3, "0")}`,
      }));

      insertPurchaseOrderWithNextPo(updatedPoData, updatedPoItems)
        .then((response) => {
          console.log("Response:", response);
          // Handle the inserted PO number and data
        })
        .catch((err) => {
          console.error("Error:", err);
          // Handle error
        });



      // Immediately update states
      setPoData(updatedPoData);
      setPoItems(updatedPoItems);
      setGeneratedPoNumber(updatedPoData.poNumber);

      //reset the podata and poitems
      setPoData({
              poNumber: "",
              supplierId: "",
              grandTotal: 0,
              createdAt: new Date().toISOString(),
              dueDate: "",
              deliveryPointId: "",
              taxes: 0,
              shippingRate: 0,
              insurance: 0,
              paymentTerms: "",
              paymentMethods: "",
              paymentDescription: "",
              poNarrative: "",
              shippingMethod: "",
              netTotal: 0,
              discount: 0,
              district: user!.lastActiveDistrict,
              lockToken: localStorage.getItem('token'),
              warehouseId: "",
              purchaserId: "",
            });

      setPoItems([]);

      scrollToTop();

      setTimeout(() => {
        toast({
          title: "Purchase Order Created",
          variant: "default",
          description: `Purchase Order Number is : ${updatedPoData.poNumber}`,
          action: <ToastAction altText="OK">OK</ToastAction>,
        });
      }, 2000);

    } catch (error) {
      console.error("Error submitting PO:", error);
    }
  };


  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling effect
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Purchase Order</h2>

      <div className="po__number-container mb-4" ref={poNumberRef}>
        <Label className="block mb-2">PO Number</Label>
        <Input
          placeholder="Your PO Number will be autogenerated here"
          readOnly
          type="text"
          name="poNumber"
          value={generatedPoNumber}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
        />
      </div>

      <div className="add__item border border-solid rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-4">Add PO Item</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 justify-end align-bottom items-end">
          <div className="reg__number-input col-span-1">
            <Label className="block mb-2">Reg Number</Label>
            <form
              onSubmit={(e) =>
                handleSearchRegNumber(e, newItem.regId!.toString())
              }
            >
              <Input
                ref={regIdRef}
                value={newItem.regId || ""}
                autoFocus
                type="text"
                name="regId"
                placeholder="Input Reg Number, then press Enter"
                onChange={handleNewItemChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </form>
          </div>
          <div className="description-input col-span-1">
          <Label className="block mb-2">Description</Label>
            <Input
              tabIndex={-1}
              type="text"
              name="description"
              placeholder="Description"
              readOnly
              value={newItem.description}
              onChange={handleNewItemChange}
              className="p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>
          <div className="part__number-input col-span-1">
          <Label className="block mb-2">Part Number</Label>
            <Input
              tabIndex={-1}
              type="text"
              name="partNumber"
              placeholder="Part Number"
              readOnly
              value={newItem.partNumber}
              onChange={handleNewItemChange}
              className="p-2 border border-gray-300 rounded-md bg-gray-200"
            />
          </div>
          <div className="order__qty-input">
            <Label className="block mb-2">Qty Order</Label>
            <Input
              type="number"
              name="qty_order"
              placeholder="Quantity Order"
              value={newItem.qty_order}
              onChange={handleNewItemChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="price__input">
            <Label className="mb-2">Price</Label>
            <Input
              type="number"
              name="markPrice"
              placeholder="Mark Price"
              value={newItem.markPrice}
              onChange={handleNewItemChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid w-full gap-1.5 mt-2">
          <Label htmlFor="message-2">Item Narrative</Label>
          <Textarea
            onChange={handleNewItemChange}
            name="itemNarrative"
            placeholder="Type your PO Item  narrative"
            id="message-2"
          />
          <p className="text-sm text-muted-foreground">
            This is an extended message for this particular Purchase Order item
          </p>
        </div>

        <div className="button__add-item mb-2 flex justify-end">
          <Button variant="outline" onClick={addItem} className="col-span-3">
            Add Item
          </Button>
        </div>
      </div>

      <div className="po__items-table px-4 w-full flex flex-col overflow-x-scroll">
        <h3 className="text-xl font-semibold mb-4">PO Items</h3>
        <table className="w-full mb-4 border-collapse border border-gray-300">
          <thead className="bg-stone-200">
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Reg. Number</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Mark Price</th>
              <th className="border p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {poItems.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.poItem}</td>
                <td className="border p-2">{item.regId}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.qty_order}</td>
                <td className="border p-2">{item.markPrice}</td>
                <td className="border p-2">{item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="gross__total mb-8">
          <Separator className="my-4" />
          {/* Display grandTotal if there are items */}
          {poItems.length > 0 && (
            <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
              <p>Gross Total: Rp{poData.grandTotal!.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="purchasing__info border border-solid rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-4">Purchasing Information</h3>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 justify-end align-bottom items-end ">
          <div className="reg__number-input col-span-1">
            <Label className="block mb-2">Price Code</Label>
            <Input
              readOnly
              tabIndex={-1}
              value="NM"
              type="text"
              name="PriceCode"
              placeholder="Price Code"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="reg__number-input col-span-1">
            <Label className="block mb-2">Supplier</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="supplierCode"
              placeholder="Supplier Code"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="freight__forwarder-input col-span-1">
            <Label className="block mb-2">Freight/Forwarder</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="freightForwarder"
              placeholder="Freight/Forwarder"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="supply__origin col-span-1">
            <Label className="block mb-2">Supply Origin</Label>
            <Input
              tabIndex={-1}
              readOnly
              type="text"
              name="supplierCode"
              placeholder="Supply from"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="delivery__point col-span-1">
            <Label className="block mb-2">Delivery Point</Label>
            <Input
              tabIndex={-1}
              readOnly
              type="text"
              name="deliveryPoint"
              placeholder="Supply to"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="delivery__point col-span-1">
            <Label className="block mb-2">Est. Leadtime</Label>
            <Input
              tabIndex={-1}
              readOnly
              type="text"
              name="estLeadtime"
              placeholder="Est. Leadtime"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="delivery__point col-span-1">
            <Label className="block mb-2">Est. Arrived</Label>
            <Input
              tabIndex={-1}
              readOnly
              type="text"
              name="estArrived"
              placeholder="Est. Arrived"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
        </div>
        <Separator className="my-8" />
        <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 justify-end align-bottom items-end ">
          <div className="payment__method-input">
            <Label className="block mb-2">Payment Method</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="paymentMethod"
              placeholder="Choose The Payment Method"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="reg__number-input col-span-1">
            <Label className="block mb-2">Payment Description</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="paymentDescription"
              placeholder="Payment Description"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="reg__number-input col-span-1">
            <Label className="block mb-2">Payment Terms</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="paymentTerms"
              placeholder="Payment Terms"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>

          <div className="delivery__point col-span-1">
            <Label className="block mb-2">Discount</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="discount"
              placeholder="Grand Total Discount %"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="supply__origin col-span-1">
            <Label className="block mb-2">Shipping Rate</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="shippingRate"
              placeholder="Shipping Rate"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="supply__origin col-span-1">
            <Label className="block mb-2">Insurance</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="insurance"
              placeholder="Insurance"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="freight__forwarder-input col-span-1">
            <Label className="block mb-2">VAT / PPn</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="taxes"
              placeholder="Taxes Percentage"
              className="p-2 border border-gray-300 rounded-md bg-slate-200"
            />
          </div>
          <div className="delivery__point col-span-1">
            <Label className="block mb-2">Net Total</Label>
            <Input
              readOnly
              tabIndex={-1}
              type="text"
              name="netTotal"
              placeholder="Net Total"
              className="p-2 border border-gray-300 rounded-md bg-yellow-200"
            />
          </div>
        </div>
      </div>

      <ReusableAlertDialog
        buttonVariant={"default"}
        triggerText={"Create Purchase Order"}
        title={"Create Purchase Order"}
        description={`Are you sure you want to create this purchase order in jobsite ${user?.lastActiveDistrict} ?`}
        cancelText={"Cancel"}
        actionText={"Create"}
        onAction={handleSubmit}
      />
    </div>
  );
};

export default CreatePO;
