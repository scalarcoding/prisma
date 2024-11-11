import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Component for Account Tab
const TabCatalogueGeneralInfo = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>General Info</CardTitle>
          <CardDescription>
            Contains general information of the particular catalogue item
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2  w-full md:w-1/3">
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
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default TabCatalogueGeneralInfo;