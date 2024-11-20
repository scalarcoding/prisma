import { useParams } from "react-router-dom";
import ProductDetailBreadCrumb from "./atomic/ProductDetailBreadCrumb";
import ProductBasicInfo from "./atomic/ProductBasicInfo";
import ProductDetailInfo from "./atomic/ProductDetailInfo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ProductDetailSimple from "./atomic/tabs/ProductDetailSimple";

const ProductsDetail = () => {
  const { id } = useParams();
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);

  // Update the caption based on the switch state
  const switchCaption = isSwitchChecked ? "Advanced" : "Simple";

  const handleCheckedChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
    console.log("Switch state:", checked);
  };

  return (
    <div className="flex flex-col">
      <div className="header flex items-center bg-white py-4 fixed h-4 w-full z-10">
        <ProductDetailBreadCrumb id={id} />
      </div>

      <div className="py-0">
        <div className="flex w-full justify-end items-center pt-8 pb-0 gap-2">
          <Label htmlFor="airplane-mode">{switchCaption}</Label>
          <Switch 
            checked={isSwitchChecked} 
            onCheckedChange={handleCheckedChange} 
            id="airplane-mode" 
          />
        </div>
        
      </div>
      { isSwitchChecked? <div className="advanced__mode">
        <div className="flex flex-col gap-4 mt-6">
      <ProductBasicInfo reg_number={parseInt(id!)} />
        <ProductDetailInfo />
      </div>
      </div> : <div className="simple__mode">
        <ProductDetailSimple/>
      </div> }
    </div>
  );
};

export default ProductsDetail;
