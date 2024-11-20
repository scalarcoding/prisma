import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ComboBox from "@/components/ui/header/combobox/combobox";
import { Input } from "@/components/ui/input";
import InputWithIcon from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
import { ProductPhotoCarousel } from "../ProductPhotoCarousel";
import { useState } from "react";
import { TbCalendar, TbRuler } from "react-icons/tb";

// Component for Account Tab
const TabCatalogueGeneralInfo = () => {

  const [productImages] = useState<File[]>([])

  type MassCategory = {
    value:string,
    label:string,
  }

  const masscategory:MassCategory[] = [
    {
        value: "light",
        label: "Light"
    },
    {
        value: "medium",
        label: "Medium"
    },
    {
        value: "weight",
        label: "Heavy"
    },
    {
      value: "extraweight",
      label: "Extra Heavy"
  },
]

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Info</CardTitle>
        <CardDescription>
          Contains general information of the particular catalogue item
        </CardDescription>
      </CardHeader>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 justify-between">
        <CardContent className="space-y-2 col-span-1">
          <CardTitle>Cataloguing Setup</CardTitle>
          <CardDescription>
            Basic Cataloguing Setup to be used for Global Default Setting
          </CardDescription>
          <div className="space-y-1">
            <Label htmlFor="stock__type-title">Stock Type</Label>
            <div className="stock__type-containers flex gap-2">
              <Input id="stock__type-code" defaultValue="S" className="w-1/3" />
              <Input
                id="stock__type-desc"
                defaultValue="SERVICE ITEMS"
                className="w-2/3"
              />
            </div>
          </div>
          <div className="register__status flex flex-row justify-between gap-2">
          <div className="space-y-1 w-full">
            <Label htmlFor="register__status-date">Registered Date</Label>
            <InputWithIcon
                icon={<TbCalendar />}
                iconPosition="suffix"
                typeof="date"
                id="register__status-date"
                value="01/01/2024"
                disabled
              />
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="register__status-by">Registered By</Label>
            <Input
                id="egister__status-by"
                defaultValue="61122016"
                className="w-full"
                disabled
              />
          </div>
          </div>
          <div className="uoi__container flex flex-row justify-between gap-2">
          <div className="space-y-1 w-full">
            <Label htmlFor="uoi__input">Unit of Issue</Label>
            <InputWithIcon
                icon={<TbRuler/>}
                iconPosition="suffix"
                typeof="text"
                id="uoi__input"
                value="EACH"
                disabled
              />
          </div>

          </div>
          
          <div className="py-4 space-y-1 flex w-full flex-col ">
          <CardTitle>Product Photos</CardTitle>
          <div className="carousel__container items-center justify-center flex border border-slate-200 rounded-md p-4">
          <ProductPhotoCarousel files={productImages} regNumber="120"/>
          </div>
            
          </div>
        </CardContent>
        <CardContent className="space-y-2 col-span-1">
          <CardTitle>Goods Measurement</CardTitle>
          <CardDescription>
            Physical properties measurement of the goods
          </CardDescription>
          <div className="dimension flex flex-row justify-between gap-2">
          <div className="space-y-1">
            <Label htmlFor="stock__length-title">Length (X)</Label>
              <InputWithIcon iconPosition="suffix" icon={<p>cm</p>} placeholder="Enter length"/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="stock__width-title">Width (Y)</Label>
              <InputWithIcon iconPosition="suffix" icon={<p>cm</p>} placeholder="Enter width"/>
          </div>
          <div className="space-y-1">
            <Label htmlFor="stock__height-title">Height (Z)</Label>
              <InputWithIcon iconPosition="suffix" icon={<p>cm</p>} placeholder="Enter height"/>
          </div>
          </div>
          <div className="mass flex flex-row justify-between gap-2">
          <div className="space-y-1 w-full">
            <Label htmlFor="stock__mass-title">Mass</Label>
              <InputWithIcon iconPosition="suffix" icon={<p>kg</p>} placeholder="Enter mass"/>
          </div>
          <div className="space-y-1 w-full">
            <Label htmlFor="stock__mass-category">Mass Category</Label>
            <ComboBox comboboxProperties={masscategory} title="Mass Category"/>
          </div>
          </div>
          
        </CardContent>
      </div>

      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default TabCatalogueGeneralInfo;
