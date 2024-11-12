import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PartNumbersList } from "../PartNumbersList";
import GlobalCrossReferenceMapping from "./GlobalCrossReferenceMapping";

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
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2">
        <CardContent className="space-y-2 col-span-1">
          <CardTitle>Part Number Preferences</CardTitle>
          <CardDescription>
          Preferred part number to be used in association with the particular register number
        </CardDescription>
          <PartNumbersList />
        </CardContent>
        <CardContent className="space-y-2">
        <CardTitle>Global Cross-Reference Mapping</CardTitle>
        <CardDescription>
          Global assignment / modification of cross reference
        </CardDescription>
        <GlobalCrossReferenceMapping/>

      </CardContent>
      </div>
      
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};

export default TabCatalogueOperationalInfo;
