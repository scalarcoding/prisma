import React from "react";
import GoodsAvatar from "./GoodsAvatar";

interface ProductBasicInfoProps {
  reg_number: number;
}

const ProductBasicInfo:React.FC<ProductBasicInfoProps>=({ reg_number }) => {
  return (
    <div className="h-28 grid grid-cols-1 md:grid-cols-3 items-center  w-full gap-2 md:gap-2">
      <div className="col__one flex flex-row gap-2 border rounded-lg p-4">
        <div className="goods__avatar h-20 w-20">
          <GoodsAvatar />
        </div>
        <div className="info__one flex flex-col h-full gap-1">
          <h1 className="text-lg font-bold">Air Filter New Model</h1>
          <div className="reg__number grid grid-cols-2 gap-2 items-center">
            <h1 className="">Reg Number</h1>
            <h1>: <span className="text-blue-500  font-bold underline">{`${reg_number}`}</span></h1>
          </div>
          <div className="pref__part_number grid grid-cols-2 gap-2 items-center">
            <h1 className="">Preferred PN</h1>
            <h1>: <span className="text-blue-500  font-bold underline">{`A1092883`}</span></h1>
          </div>
        </div>
      </div>
      <div className="col__two flex flex-col gap-1 h-full align-top border rounded-lg p-2">
        <h1 className="text-lg">Catalogue Properties</h1>
        <div className="info_two">
          <div className="uoi grid grid-cols-2">
            <h1 className="text-sm">Category</h1>
            <h1 className="text-sm">: Service Items</h1>
          </div>
          <div className="uom grid grid-cols-2">
            <h1 className="text-sm">Registered Date</h1>
            <h1 className="text-sm">: 11/11/2024</h1>
          </div>
          <div className="uop grid grid-cols-2">
            <h1 className="text-sm">Registered by</h1>
            <h1 className="text-sm">: 61122016</h1>
          </div>
        </div>
      </div>
      <div className="col__three flex flex-col gap-1 h-full align-top border rounded-lg p-2">
        <h1 className="text-lg">Measurement</h1>
        <div className="info_two">
          <div className="uoi grid grid-cols-2">
            <h1 className="text-sm">UoI</h1>
            <h1 className="text-sm">: EACH</h1>
          </div>
          <div className="uom grid grid-cols-2">
            <h1 className="text-sm">UoM</h1>
            <h1 className="text-sm">: EACH</h1>
          </div>
          <div className="uop grid grid-cols-2">
            <h1 className="text-sm">UoP</h1>
            <h1 className="text-sm">: EACH</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
