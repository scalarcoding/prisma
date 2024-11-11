import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Component for Account Tab
const TabCatalogueProvisioningInfo = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Provisioning Info</CardTitle>
          <CardDescription>
            Contains global default setting for catalogue item
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2  w-full md:w-1/3">
        <div className="space-y-1">
          <Label htmlFor="expense__element">Expense Element</Label>
          <div className="expense__element-container flex gap-2">
            <Input id="expense__element-id" defaultValue="2252" className="w-1/3" />
            <Input
              id="expense__element-desc"
              defaultValue="SPAREPARTS"
              className="w-2/3"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock__item-id">Stock Item</Label>
          <div className="expense__element-container flex gap-2">
            <Input id="stock__item-id" defaultValue="O" className="w-1/3" />
            <Input
              id="stock__item-desc"
              defaultValue="OWN STOCK ITEM"
              className="w-2/3"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="stock__class-id">Global Class</Label>
          <div className="stock__class-container flex gap-2">
            <Input id="stock__class-id" defaultValue="P" className="w-1/3" />
            <Input
              id="stock__item-desc"
              defaultValue="PURCHASE AS REQUIRED"
              className="w-2/3"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="proc_method-id">Procurement Method</Label>
          <div className="proc__method-container flex gap-2">
            <Input id="proc__method-id" defaultValue="PR, CT, DC, ID" className="w-1/3" />
            <Input
              id="proc__method-desc"
              defaultValue="PURCHASE, CENTRALIZE, DECENTRALIZE, INTERDISTRICT"
              className="w-2/3"
            />
          </div>
        </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default TabCatalogueProvisioningInfo;