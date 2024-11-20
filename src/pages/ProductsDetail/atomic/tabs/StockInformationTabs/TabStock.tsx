import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as per your project structure

const TabStock = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    setIsLoading(true); // Start loading
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 500ms
    }, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Sample data for the table
  const warehouseData = [
    { warehouse: "MAIN", SOH: 120, AVB: 50, DIN: 80, DOUT: 30, MIT: 60, ROS: 110, ROB: 40 },
    { warehouse: "WH1", SOH: 100, AVB: 30, DIN: 50, DOUT: 20, MIT: 40, ROS: 90, ROB: 35 },
    { warehouse: "WH2", SOH: 150, AVB: 60, DIN: 90, DOUT: 40, MIT: 70, ROS: 130, ROB: 50 },
    { warehouse: "WH3", SOH: 200, AVB: 80, DIN: 110, DOUT: 50, MIT: 100, ROS: 150, ROB: 60 },
  ];

  return (
    <div className="h-full w-full">
      {isLoading ? (
        <div className="flex flex-col h-full gap-2 p-2 w-full">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">Active WH</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">SOH</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">AVB</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">DIN</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">DOUT</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">MIT</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">ROS</th>
                <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">ROB</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {warehouseData.map((row) => (
                <tr key={row.warehouse} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">{row.warehouse}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.SOH}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.AVB}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.DIN}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.DOUT}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.MIT}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.ROS}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.ROB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TabStock;
