import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PartNumbersList } from "../PartNumbersList";

// Component for Account Tab
const TabCatalogueOperationalInfo = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Operational Info</CardTitle>
          <CardDescription>
            Contains global operational configurations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <PartNumbersList/>  
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    );
  }

  export default TabCatalogueOperationalInfo;