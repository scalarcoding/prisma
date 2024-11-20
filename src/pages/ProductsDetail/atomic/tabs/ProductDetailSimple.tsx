import GoodsAvatar from "../GoodsAvatar";
import {
    TbDotsCircleHorizontal,
  TbShoppingBagCheck,
  TbShoppingCart,
  TbStarFilled,
} from "react-icons/tb";
import { Button } from "@/components/ui/button";
import NumberCounter from "./NumberCounter";
import StockInformationTabs from "./StockInformationTabs/StockInformationTabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

const ProductDetailSimple = () => {



  return (
    <div className="simple__page flex flex-col w-full">
      <div className="mt-6 max-h-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-20 gap-4">
        <div className="left__panel  w-full">
        <div
      className="main__image-container rounded-lg image__container h-auto w-full flex justify-center items-center bg-white relative"
      style={{ aspectRatio: "4 / 3" }}
    >
      {/* Image Avatar */}
      <GoodsAvatar />

      {/* Button in top-right corner */}
     
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button
        className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
        style={{
          border: "rgba(0, 0, 0, 0.2)", // Optional: To create a subtle border effect
        }}
      >
        <TbDotsCircleHorizontal size={36} /> {/* Horizontal three dots icon */}
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white p-4 shadow-lg rounded-lg gap-2 z-10">
        <DropdownMenuLabel className="font-bold mb-4">Actions</DropdownMenuLabel>
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
            <h1 className="text-primary">1030004</h1>
            <h1 className="text-gray-400"> | </h1>
            <div className="rating flex flex-row items-center gap-1">
              <TbStarFilled className="text-yellow-500 " />
              <h1 className=""> 4.9 </h1>
            </div>
          </div>
          <h1 className="text-xl font-bold">AIR FILTER NEW VERSION</h1>
          <StockInformationTabs/>
          <div className="order__action-container w-full h-32 grid grid-cols-1 lg:grid-cols-2 gap-1 my-1">
            <div className="quantity__counter w-full lg:px-10 h-full flex flex-row items-center justify-center align-middle">
              <NumberCounter />
            </div>
            <div className="order__action-buttons w-full  flex flex-col gap-4 items-center justify-center">
              <Button variant="outline" className="w-full">
                <span>
                  <TbShoppingBagCheck />
                </span>
                <span>Keranjang</span>
              </Button>
              <Button className="w-full">
                <span>
                  <TbShoppingCart />
                </span>
                <span>Order Sekarang</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSimple;
