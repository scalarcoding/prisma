import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputWithIcon from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
import { TbCalendar, TbMenu2 } from "react-icons/tb";

// Component for Account Tab
const TabCataloguePurchasingInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchasing Information</CardTitle>
        <CardDescription>
            Contains global level purchasing directive
          </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2  w-full md:w-1/3">
        <div className="space-y-1">
          <Label htmlFor="pricecode">Price Code</Label>
          <div className="supplier__id flex gap-2">
            <Input id="pricecode" defaultValue="FP" className="w-1/3" />
            <Input
              id="price__desc"
              defaultValue="FIXED PRICE AGREEMENT"
              className="w-2/3"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="supplier">Current Supplier</Label>
          <div className="supplier__id flex gap-2">
            <Input id="supp_id" defaultValue="001" className="w-1/3" />
            <Input
              id="supp_name"
              defaultValue="CV. Telaga Raya"
              className="w-2/3"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Input id="location" defaultValue="Balikpapan" />
        </div>

        <div className="space-y-1">
          <div className="fpa flex gap-2">
            <div className="fpa__id w-2/6">
              <Label htmlFor="fpa_group_id">FPA Grp Id</Label>
              <Input id="fpa_group_id" defaultValue="F0753" />
            </div>
            <div className="fpa__desc w-3/6">
              <Label htmlFor="fpa_group_name">FPA Group Desc.</Label>
              <Input
                id="fpa_group_name"
                defaultValue="Tender 2024 - Telaga Raya"
              />
            </div>
            <div className="fpa__id w-1/6">
              <Label htmlFor="fpa_group_id">FPA No</Label>
              <Input id="fpa_group_id" defaultValue="22" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="fpa__validity flex gap-2">
            <div className="fpa__valid-from w-1/2">
              <Label htmlFor="fpa_from">Unit of Purchase</Label>
              <InputWithIcon
                icon={<TbMenu2 />}
                iconPosition="suffix"
                typeof="date"
                id="uop"
                value="ASSY"
              />
            </div>
            <div className="fpa__valid-to w-1/2">
              <Label htmlFor="fpa_to">Purchase Ratio</Label>
              <InputWithIcon
                icon={<h1>1 : </h1>}
                iconPosition="prefix"
                typeof="number"
                id="pur_ratio"
                value="10000"
              />
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="fpa__validity flex gap-2">
            <div className="fpa__valid-from w-1/2">
              <Label htmlFor="fpa_from">Valid From</Label>
              <InputWithIcon
                icon={<TbCalendar />}
                iconPosition="suffix"
                typeof="date"
                id="fpa_from"
                value="01/01/2024"
              />
            </div>
            <div className="fpa__valid-to w-1/2">
              <Label htmlFor="fpa_to">Valid To</Label>
              <InputWithIcon
                icon={<TbCalendar />}
                iconPosition="suffix"
                typeof="date"
                id="fpa_to"
                value="31/12/2024"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="default">Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default TabCataloguePurchasingInfo;
