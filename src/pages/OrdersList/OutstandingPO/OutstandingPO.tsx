import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from Shadcn
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";

const OutstandingPOTab: React.FC = () => {
  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a delay (e.g., 2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed
    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Outstanding Purchase Orders (PO)</h2>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
        </div>
      ) : (
        <Table className="w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Delivery Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>PO-301</TableCell>
              <TableCell>ABC Supplies</TableCell>
              <TableCell>Spark plugs</TableCell>
              <TableCell>2024-11-25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PO-302</TableCell>
              <TableCell>XYZ Parts Co.</TableCell>
              <TableCell>Tires</TableCell>
              <TableCell>2024-11-28</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OutstandingPOTab;
