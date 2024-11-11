import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Component for Account Tab
const TabCatalogueDistrictConfiguration = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>District Configurations</CardTitle>
          {/* <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Active Warehouse(s)</Label>
            <Input id="name" defaultValue="TCMM, KPCS, BAYA, TIS" />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default TabCatalogueDistrictConfiguration;