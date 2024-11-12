import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Component for Account Tab
const TabCatalogueDistrictConfiguration = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>District Configurations</CardTitle>
          <CardDescription>
            Make changes to your configuration here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
       
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default TabCatalogueDistrictConfiguration;