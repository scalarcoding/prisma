import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from Shadcn
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";

const OutstandingPRTab: React.FC = () => {
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
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Outstanding Purchase Requests (PR)</h2>
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
              <TableHead>Requested Item</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>PR-101</TableCell>
              <TableCell>Oil filter</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PR-102</TableCell>
              <TableCell>Brake pads</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Approved</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OutstandingPRTab;
