import { useParams } from "react-router-dom";
import ProductDetailBreadCrumb from "./atomic/ProductDetailBreadCrumb";
import ProductBasicInfo from "./atomic/ProductBasicInfo";
import ProductDetailInfo from "./atomic/ProductDetailInfo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import ProductDetailSimple from "./atomic/tabs/ProductDetailSimple";
import { supabase } from "@/api/repository/supabase";
import { ProductDetail } from "./product_detail_model";
import { useAuth } from "@/hooks/use-auth";

const ProductsDetail = () => {
  const { id } = useParams();
  const [isSwitchChecked, setIsSwitchChecked] = useState<boolean>(false);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  const { user } = useAuth();

  // Update the caption based on the switch state
  const switchCaption = isSwitchChecked ? "Advanced" : "Simple";

  const handleCheckedChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
    console.log("Switch state:", checked);
  };

  useEffect(() => {
    console.log("Product ID:", id);
    fetchItemDetailsByRegNumber();
  },[]);


  const fetchItemDetailsByRegNumber = async () => {
    try {
      const { data, error } = await supabase
        .rpc('fetch_item_details_by_reg_number', { p_reg_number: id });
  
      if (error) {
        console.error('Error fetching item details:', error.message);
        return null;
      }

      console.log('Item details:', data);
      

      setProductDetail(data[0] as ProductDetail);

    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
}

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
        <ProductDetailSimple productDetail={productDetail} reg_number={parseInt(id!)} district={user?.lastActiveDistrict}/>
      </div> }
    </div>
  );
};

export default ProductsDetail;
