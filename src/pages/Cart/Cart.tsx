import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import CartItemComponent from "./CartItemComponent";
import CartSummary from "./CartSummary";
import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
import { checkApprovalStatus } from "@/api/approval/check_approval";
import { ApprovalStatus } from "@/api/approval/approval_status";

const Cart: React.FC = () => {
  const { user, modifyItemInCart } = useAuth();
  const [dropPoint, setDropPoint] = useState("");
  const [receiver, setReceiver] = useState("");
  const [schedule, setSchedule] = useState<number>(0);
  const [orderedBy, setOrderedBy] = useState("");
  const [wrcart, setWRCart] = useState<WarehouseRequisitionCart[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [validation, setValidation] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [approvalMessage, setApprovalMessage] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | null>(null);





  useEffect(()=>{

    const getStatus = async() => {
      const approval_status = await checkApprovalStatus({ total, p_district: user!.lastActiveDistrict, p_user_id: user!.userid });
    if(approval_status?.approval_status ==='approved'){
      setApprovalMessage('')
    }
    else{
      setApprovalMessage(`Your order will be redirected to ${approval_status?.incumbent_description} for approval`)
    }
    setApprovalStatus(approval_status)
    }

    getStatus()
    
  },[total, user])


  const handleUpdateQuantity =  async (id: number, quantity: number, inv_value:number) => {

    console.log("Updating item with id:", id , "to quantity:", quantity);

    await modifyItemInCart(id, quantity, inv_value);

  };


  const handleRemoveItem = (id: number) => {
    console.log("Removing item with id:", id);
    
  };

  // const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddMore = () => {
    window.location.href = "/products";
  };

  const validateCart = useCallback(() => {
    if (wrcart.length === 0) {
      setErrorMessage("Cart is empty!");
      return false;
    }

    for (let i = 0; i < wrcart.length; i++) {
      if (wrcart[i].inventory_value === null) {
        setErrorMessage("Inventory Value is required!");
        return false;
      }
    }
  
    if (!dropPoint) {
      setErrorMessage("Drop point is required!");
      return false;
    }
  
    if (!receiver) {
      setErrorMessage("Receiver is required!");
      return false;
    }
  
    if (!schedule) {
      setErrorMessage("Schedule is required!");
      return false;
    }
  
    if (!orderedBy) {
      setErrorMessage("Ordered by is required!");
      return false;
    }
  
  
    setErrorMessage("");
    return true;
  }, [wrcart, dropPoint, receiver, schedule, orderedBy]);

  useEffect(() => {
    setOrderedBy(user?.userid ?? "");
  }, [user?.userid]);

  useEffect(() => { 
    setWRCart(user?.cart ?? []);
    setTotal(user?.cart?.reduce((sum, item) => sum + (item.inventory_value ?? 0) * item.order_qty!, 0) ?? 0);
    setValidation(validateCart());
  }, [user?.cart, dropPoint, receiver, schedule, orderedBy, validateCart]);

  
  useEffect(() => {
    setWRCart(user?.cart ?? []);
    setTotal(user?.cart?.reduce((sum, item) => sum + (item.inventory_value ?? 0) * item.order_qty!, 0) ?? 0);
    setValidation(validateCart());
  }, [user?.cart, validateCart]);
  

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {wrcart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {wrcart.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
            <div className="Grand Totals flex justify-end">
              <h1>Grand Total : Rp.{total}</h1>
            </div>
            <Button onClick={handleAddMore} variant="outline">
              Tambahkan Barang Lagi
            </Button>

            
          </div>
          <CartSummary
          approvalStatus={approvalStatus!}
            approvalMessage={approvalMessage!}
            total={total}
            validation={validation}
            errorMessage={errorMessage}
            dropPoint={dropPoint}
            receiver={receiver}
            schedule={schedule || 0}
            orderedBy={orderedBy}
            setDropPoint={setDropPoint}
            setReceiver={setReceiver}
            setSchedule={setSchedule}
          />
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">Your cart is empty!</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => (window.location.href = "products")}
          >
            Browse Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
