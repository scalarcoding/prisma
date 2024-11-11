import { ProductMaintenanceBreadCrumb } from "./atomic/ProductMaintenanceBreadCrumb";
import { PreferedPNList } from "./atomic/PreferedPNList";
import { Button } from "@/components/ui/button";

const ProductsMaintenance = () => {
  return (
    <div className="flex flex-col">
      <div className="header bg-white py-10 fixed h-4 w-full z-10">
        <ProductMaintenanceBreadCrumb />
      </div>
      <div className="header bg-white py-4 h-4 w-full mb-12"></div>

      <div className="maintenance__contents grid-flow-row grid grid-cols-4 h-screen px-8 md:px-4">
        <div className="min-h-[650px] flex flex-col bg-slate-100 col-span-4 md:col-span-1 p-2 gap-2">
          <h1 className="mb-4 font-bold">Part Number Management</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-32 w-32 bg-slate-200 rounded-lg border-slate-400 border-2 border-dashed "></div>
              <Button className="bg-primary">Add New PN</Button>
            </div>

            <PreferedPNList />
          </div>
        </div>
        <div className="min-h-[650px]  bg-slate-200 col-span-4 md:col-span-1"></div>
        <div className="min-h-[650px]  bg-slate-300 col-span-4 md:col-span-1"></div>
        <div className="min-h-[650px] bg-slate-400 col-span-4 md:col-span-1"></div>
      </div>
    </div>
  );
};

export default ProductsMaintenance;
