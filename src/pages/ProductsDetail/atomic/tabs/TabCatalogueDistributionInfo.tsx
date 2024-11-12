
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DistributionStatus } from "@/model/distributionStatus";
import BasicTable from "../basictable";

// Component for Account Tab
const TabCatalogueDistributionInfo = () => {


  // Example Usage with simulated data
// Mock data for simulation
const mockData: DistributionStatus[] = [
  {
    district_code: "BAYA",
    available: 120,
    owned_soh: 300,
    consigned_soh: 150,
    total_soh: 450,
    in_transit: 20,
    total_assets: 470,
  },
  {
    district_code: "KPCS",
    available: 85,
    owned_soh: 220,
    consigned_soh: 100,
    total_soh: 320,
    in_transit: 30,
    total_assets: 350,
  },
  {
    district_code: "TCMM",
    available: 60,
    owned_soh: 150,
    consigned_soh: 80,
    total_soh: 230,
    in_transit: 15,
    total_assets: 245,
  },
  {
    district_code: "TIS",
    available: 95,
    owned_soh: 200,
    consigned_soh: 120,
    total_soh: 320,
    in_transit: 25,
    total_assets: 345,
  },
  // Add more entries if needed to test pagination
];


    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribution Information</CardTitle>
          <CardDescription>
            Let you know the stock information accross the districts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
        <BasicTable data={mockData} rowsPerPage={5} />
        </CardContent>
      </Card>
    );
  }

  export default TabCatalogueDistributionInfo;