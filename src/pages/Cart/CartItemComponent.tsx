import { Button } from "@/components/ui/button";
import GoodsAvatar from "../ProductsDetail/atomic/GoodsAvatar";
import { Input } from "@/components/ui/input";
import { WarehouseRequisitionCart } from "@/components/ui/navbar/Cart/wr_cart_model";
import { ReusablePopover } from "../ProductsDetail/atomic/tabs/ReusablePopover";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

interface CartItemProps {
  item: WarehouseRequisitionCart;
  onUpdateQuantity: (id: number, quantity: number, inv_value:number) => void;
  onRemove: (id: number) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const{ user, setCartItemEstimationValue } = useAuth();

  const [estimationValue, setEstimationValue] = useState<number | null>(null);

  const handleChangeEstimationValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimationValue(parseInt(e.target.value));
  }

  const handleSetEstimationValue = (e: React.FormEvent<HTMLFormElement>, id:number, qty:number) => {
    e.preventDefault();
    console.log("Estimation value:", estimationValue , "for item with id:", id);
    if (user?.userid) {
      setCartItemEstimationValue(user.userid, id, estimationValue!, qty);
    } else {
      console.error("User ID is undefined");
    }
    };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-between gap-4 border-b pb-4">
      <div className="flex items-center gap-4">
        <div className="product__image w-16 h-16">
          {item.img_url || item.img_url == "" ? (
            <img src={item.img_url}></img>
          ) : (
            <GoodsAvatar />
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{item.item_description}</h3>
          <p className="text-sm text-muted-foreground">
            Reg Number: <span className="underline">{item.reg_number}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.order_qty! - 1, item.inventory_value!)}
          disabled={item.order_qty! <= 1}
        >
          -
        </Button>
        <Input
          type="number"
          value={item.order_qty}
          onChange={(e) =>
            onUpdateQuantity(item.id, parseInt(e.target.value) || 1, item.inventory_value!)
          }
          className="w-16 text-center"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.order_qty! + 1, item.inventory_value!)}
        >
          +
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </div>
     { !item.inventory_value &&  <div className="warning__nullvalue grid col-span-2 items-center justify-center w-full">
        <h1>
          This item has no inventory value,
          <span>
            <ReusablePopover
              trigger={
                <Button
                  variant="link"
                  className="font-bold underline hover:text-primary"
                >
                  Set Estimation value
                </Button>
              }
              title="Inventory Value"
              content={
                <form onSubmit={e => handleSetEstimationValue(e, item.item_number!, item.order_qty!)}>

                  <Input
                  placeholder="Fill and Press Enter"  
                  onChange={handleChangeEstimationValue}
                  type="number"></Input>
                </form>
              }
            ></ReusablePopover>
          </span>
        </h1>
      </div> }
    </div>
  );
};

export default CartItemComponent;
