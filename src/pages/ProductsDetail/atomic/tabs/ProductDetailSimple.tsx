import GoodsAvatar from "../GoodsAvatar";
import {
  TbDotsCircleHorizontal,
  TbShoppingBagCheck,
  TbShoppingCart,
  TbStarFilled,
} from "react-icons/tb";
import { Button } from "@/components/ui/button";
import StockInformationTabs from "./StockInformationTabs/StockInformationTabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { ProductDetail } from "../../product_detail_model";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/api/repository/supabase";
import { useAuth } from "@/hooks/use-auth";
import { AddItemPayload } from "@/components/ui/navbar/Cart/wr_cart_model";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ProductDetailSimpleProps {
  // Define the props for this component
  reg_number: number;
  productDetail: ProductDetail | null;
  district: string | undefined;
}

const ProductDetailSimple: React.FC<ProductDetailSimpleProps> = ({
  reg_number,
  productDetail,
  district,
}) => {
  const [warehouse, setWarehouse] = useState<string>("");
  const [allWarehouse, seAlltWarehouse] = useState<string[]>([]);

  const { user, addItemToCart } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch all warehouse
    fetchAllWarehouse();
  }, [district]);

  useEffect(() => {
    console.log(district);
  }, []);

  const fetchAllWarehouse = async () => {
    try {
      const { data, error } = await supabase
        .from("districts")
        .select("warehouse")
        .eq("code", district);

      if (error) {
        console.error("Error fetching warehouse:", error.message);
        return null;
      }

      console.log(data);

      const warehouseList = data[0].warehouse;
      seAlltWarehouse(warehouseList);
      setWarehouse(warehouseList[0]);
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };


  const addToCart = async (reg_number: number): Promise<number> => {
    console.log("Adding item to cart:", reg_number);
  
    const itemPayload: AddItemPayload = {
      cartItemId: `${user?.lastActiveDistrict}${user?.userid}${reg_number}`,
      district: user?.lastActiveDistrict ?? "",
      userId: user?.userid ?? "",
      regNumber: reg_number,
      itemNumber: (user?.cart?.length ?? 1) + 1,
      orderQty: 1,
      inventoryValue: null,
      inventoryCost: null,
    };
  
    const res = await addItemToCart(itemPayload);
    console.log("Response:", res);
  
    if (res?.error?.code != null) {
      let title = "";
      let description = "";
  
      if (res.error?.code === "PGRST116") {
        title = "Item is not activated in district";
        description = `Item with register number ${reg_number} is not activated in district.`;
      } else if (res.error?.code === "23505") {
        title = "Item is already in cart";
        description = `Item with register number ${reg_number} is already in cart.`;
      }
  
      toast({
        title: title,
        variant: "destructive",
        description: description,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
  
      return 0; // Indicate failure
    } else {
      console.log("Item added to cart:", res);
  
      toast({
        title: "Item Added to Cart",
        variant: "default",
        description: `Item with register number ${reg_number} has been added to cart.`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
  
      return 1; // Indicate success
    }
  };
  

  const handleAddToCart = async() => {
    const res = await addToCart(reg_number);
    console.log(res);
      
  };
  const handleOrderNow = async() => {
    const res =  await addToCart(reg_number);
    if(res === 1){
      window.location.href = "/cart";
    }

  };

  return (
    <div className="simple__page flex flex-col w-full">
      <div className="mt-6 max-h-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-20 gap-4">
        <div className="left__panel  w-full">
          <div
            className="main__image-container rounded-lg image__container h-auto w-full flex justify-center items-center bg-white relative"
            style={{ aspectRatio: "4 / 3" }}
          >
            {/* Image Avatar */}
            {productDetail ? (
              productDetail.img_url ? (
                <img
                  src={productDetail.img_url}
                  alt="Product Image"
                  className="w-full h-full object-contain rounded-lg aspect-square"
                />
              ) : (
                <GoodsAvatar />
              )
            ) : (
              <Skeleton className="h-full w-full rounded-xl" />
            )}

            {/* Button in top-right corner */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                  style={{
                    border: "rgba(0, 0, 0, 0.2)", // Optional: To create a subtle border effect
                  }}
                >
                  <TbDotsCircleHorizontal size={36} />{" "}
                  {/* Horizontal three dots icon */}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-white p-4 shadow-lg rounded-lg gap-2 z-10">
                <DropdownMenuLabel className="font-bold mb-4">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex justify-between items-center py-2">
                    Give Rating
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between items-centern py-2">
                    Report Item
                    <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex justify-between items-center py-2">
                    Wishlist
                    <DropdownMenuShortcut>⇧⌘W</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="images__container w-full p-4 flex flex-row gap-4">
            <div
              className="image__1 w-full cursor-pointer bg-white border-2 border-transparent rounded-lg hover:border-primary hover:transition-all"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GoodsAvatar />
            </div>
            <div
              className="image__1 w-full cursor-pointer bg-white border-2 border-transparent rounded-lg hover:border-primary hover:transition-all duration-300 ease-in-out"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GoodsAvatar />
            </div>
            <div
              className="image__1 w-full cursor-pointer bg-white border-2 border-transparent rounded-lg hover:border-primary hover:transition-all duration-300 ease-in-out"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GoodsAvatar />
            </div>
            <div
              className="image__1 w-full cursor-pointer bg-white border-2 border-transparent rounded-lg hover:border-primary hover:transition-all duration-300 ease-in-out"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GoodsAvatar />
            </div>
            <div
              className="image__1 w-full cursor-pointer bg-white border-2 border-transparent rounded-lg hover:border-primary hover:transition-all duration-300 ease-in-out"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GoodsAvatar />
            </div>
          </div>
        </div>
        <div className="right__panel w-full flex flex-col gap-2 justify-between">
          <div className="top__info flex flex-row gap-4 items-center">
            <h1 className="text-primary">{reg_number}</h1>

            <h1 className="text-gray-400"> | </h1>
            <div className="rating flex flex-row items-center gap-1">
              <TbStarFilled className="text-yellow-500 " />
              <h1 className=""> 4.9 </h1>
            </div>
          </div>
          {productDetail ? (
            <h1 className="text-xl font-bold">
              {productDetail.item_description}
            </h1>
          ) : (
            <Skeleton className="min-h-4 min-w-[200px] md:w-[150px] xl:w-[250px]" />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto flex items-center">
                {warehouse} <ChevronDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-gray-300 rounded-md shadow-md p-2"
            >
              {allWarehouse.map((wh, index) => (
                <DropdownMenuItem
                  key={index}
                  className="capitalize text-black hover:bg-gray-100 cursor-pointer px-4 py-2 rounded"
                  onSelect={() => setWarehouse(wh)}
                >
                  {wh}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <StockInformationTabs warehouse={allWarehouse[0]} />
          <div className="order__action-container w-full h-32 grid grid-cols-1 lg:grid-cols-2 gap-4 my-1 align-bottom justify-end items-end pb-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleAddToCart}
            >
              <span>
                <TbShoppingBagCheck />
              </span>
              <span>Keranjang</span>
            </Button>
            <Button className="w-full" onClick={handleOrderNow}>
              <span>
                <TbShoppingCart />
              </span>
              <span>Order Sekarang</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSimple;
