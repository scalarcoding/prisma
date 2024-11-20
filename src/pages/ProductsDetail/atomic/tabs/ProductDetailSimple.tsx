import GoodsAvatar from "../GoodsAvatar";
import { Link } from "react-router-dom";
import { TbShoppingBagCheck, TbShoppingCart, TbStarFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import NumberCounter from "./NumberCounter";

const ProductDetailSimple = () => {
  return (
    <div className="simple__page flex flex-col w-full">
      <div className="mt-6 max-h-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-32">
        <div className="left__panel bg-slate-100 w-full">
          <div
            className="main__image-container  rounded-lg image__container h-auto w-full flex justify-center items-center bg-white"
            style={{ aspectRatio: "4 / 3" }}
          >
            <GoodsAvatar />
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
        <div className="right__panel w-full flex flex-col gap-2 justify-between p-4 border border-slate-400">
          <div className="status__bar-container grid grid-cols-2">
            <div className="status">
              <div className="rating"></div>
            </div>
            <div className="report__goods flex w-full justify-end gap-2 text-sm">
              <Link to="" className="hover:underline">
                Rate
              </Link>
              <Link to="" className="hover:underline">
                Report
              </Link>
            </div>
          </div>
          <div className="top__info flex flex-row gap-4 items-center">
            <h1 className="text-primary">1030004</h1>
            <h1 className="text-gray-400"> | </h1>
            <div className="rating flex flex-row items-center gap-1">
              <TbStarFilled className="text-yellow-500 " />
              <h1 className=""> 4.9 </h1>
            </div>
          </div>
          <h1 className="text-xl font-bold">AIR FILTER NEW VERSION</h1>
          <div className="stock__informations w-full bg-slate-100 h-72">

          </div>
          <div className="order__action-container w-full h-32 grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="quantity__counter w-full md:px-10 h-full flex flex-row items-center justify-center align-middle" >
                <NumberCounter/>
            </div>
            <div className="order__action-buttons w-full  flex flex-col gap-4 items-center justify-center" >
                <Button variant="outline" className="w-full"><span><TbShoppingBagCheck/></span><span>Keranjang</span></Button>
                <Button className="w-full" ><span><TbShoppingCart/></span><span>Order Sekarang</span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSimple;
