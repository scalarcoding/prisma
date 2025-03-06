import React, { useState } from "react";
import { SkeletonCard } from "../../../components/ui/skeletons/SkeletonCard";
import { Link } from "react-router-dom";
import { ProductType } from "./productype";
import { Button } from "@/components/ui/button";
import { TbShoppingBagPlus, TbStar } from "react-icons/tb";
import GoodsAvatar from "@/pages/ProductsDetail/atomic/GoodsAvatar";
import { ProductCardMenu } from "./ProductCardMenu/ProductCardMenu";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AddItemPayload } from "@/components/ui/navbar/Cart/wr_cart_model";

const ProductCard: React.FC<ProductType> = ({
  reg_number,
  part_number,
  item_description,
  img_url,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const { user, addItemToCart } = useAuth();
  const { toast } = useToast();

  React.useEffect(() => {
    setIsLoading(false);
  }, []);


  const handleAddItemToCart = async (reg_number: number) => {
    console.log("Adding item to cart:", reg_number);
    const itemPayload:AddItemPayload = {
      cartItemId: `${user?.lastActiveDistrict}${user?.userid}${reg_number}`,
      district: user?.lastActiveDistrict ?? "",
      userId: user?.userid ?? "",
      regNumber: reg_number,
      itemNumber: (user?.cart?.length ?? 1) + 1,
      orderQty: 1,
      inventoryValue: null,
      inventoryCost: null,
    }

    const res = await addItemToCart(itemPayload);
    console.log("Response:", res);
    

    if(res?.error?.code != null){
      let title ='';
      let description = '';

      if(res.error?.code =='PGRST116'){
        title = 'Item is not activated in district';
        description = `Item with register number ${reg_number} is not activated in district.`;
      }
      else if(res.error?.code =='23505'){
        title = 'Item is already in cart';
        description = `Item with register number ${reg_number} is already in cart.`;
      }
      toast({
        title: title,
        variant: "destructive",
        description: description,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      return;
    }
    else{
      console.log("Item added to cart:", res);
      toast({
        title: "Item Added to Cart",
        variant: "default",
        description: `Item with register number ${reg_number} has been added to cart.`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    }


    
  }



  return (
    <div>
      <div
        key={reg_number}
        className="card bg-white hover:bg-slate-100 ease-in-out transition p-4 border rounded-lg"
      >
        <div className="relative">
          {isLoading ? (
            <div className="inset-0 flex justify-center items-center">
              <SkeletonCard />
            </div>
          ) : (
            <div>
               <Link to={`/product/detail/${reg_number}`}>
              {img_url==='' || !img_url ? (
                <div><GoodsAvatar /></div>
              ) : (
                <img
                  src={img_url}
                  alt="Product Image"
                  className="block border rounded-lg border-gray-100 object-cover w-full h-full aspect-square"
                  // onError={() => setIsImageError(true)} // Handle image error
                />
                
              )}
              </Link>

              <Link to={`/product/detail/${reg_number}`}>
                <h3 className="mt-4 text-lg font-semibold text-blue-600 hover:underline cursor-pointer">
                  {reg_number}
                </h3>
              </Link>
              <h3 className="text-lg">{part_number}</h3>
              <p
                className="text-sm text-slate-400 font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                onMouseEnter={() => setIsHovered(true)} // Set hover to true on mouse enter
                onMouseLeave={() => setIsHovered(false)} // Set hover to false on mouse leave
              >
                {item_description}
              </p>
              {/* Popup for full text */}
              {isHovered && (
                <div className="absolute bg-white bg-opacity-10 backdrop-blur-md p-4 border rounded-lg shadow-lg max-w-xs w-auto z-10 mt-2 text-sm text-slate-500">
                  {item_description}
                </div>
              )}
              <div className="action__bars mt-4">
                <Button variant="ghost"
                  onClick={() => handleAddItemToCart(reg_number)}
                >
                  <TbShoppingBagPlus />
                </Button>
                <Button variant="ghost">
                  <TbStar />
                </Button>
                <ProductCardMenu reg_number={reg_number}/>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
