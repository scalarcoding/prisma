import React from "react";
import { DistrictStockModel } from "./district-stock-model";
import { Button } from "@/components/ui/button";
import { ReusableAlertDialog } from "@/components/ui/alert/ReusableAlertDialog";

interface TabStockProps {
  reg_number: string | undefined;
  districtData: DistrictStockModel[];
  error: string | null;
  district: string;
  warehouse: string;
  onActivate: (regNumber: string) => void; // Callback for the parent
}

const TabStock: React.FC<TabStockProps> = ({
  reg_number,
  districtData,
  error,
  district,
  warehouse,
  onActivate,
}) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (districtData.length === 0) {
    return (
      <div className="flex flex-col gap-2 justify-center w-full mt-20 align-middle items-center">
        <h1>This item is not yet activated in your district.</h1>
        <div className="buttons_panel w-48 flex flex-col gap-2">
          <ReusableAlertDialog
            triggerText="Default Activation"
            title="Default Catalogue Activation"
            description={`Activate to district with default catalogue properties? \n District : ${district}\nWarehouse : ${warehouse}`}
            cancelText="Cancel"
            actionText="Activate"
            onAction={() => {
              onActivate(reg_number!);
            }}
          />
          <Button variant="ghost">Complete Activation</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto flex w-full">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              Active WH
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              SOH
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              AVB
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              DIN
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              DOUT
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              MIT
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              ROS
            </th>
            <th className="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-300">
              ROB
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {districtData.map((row) => (
            <tr key={row.warehouse} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                {row.warehouse}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.soh}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.avg}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.din}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.dout}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.mit}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.ros}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-400">{row.rob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabStock;
