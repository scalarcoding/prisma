import React, { useEffect, useState } from "react";
import TabStock from "./TabStock/TabStock";
import TabUsage from "./TabUsage";
import TabTransaction from "./TabTransaction";
import TabAnalysis from "./TabAnalysis";
import { fetchDistrictStockData } from "@/api/productdetail/district-stock-fetcher";
import { useAuth } from "@/hooks/use-auth";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import { defaultActivateRegnumberToDistrict } from "@/api/productmaintenance/default-regnumber-activation";

// Define the DistrictStockModel interface
export interface DistrictStockModel {
  warehouse: string;
  soh: number;
  avg: number;
  din: number;
  dout: number;
  mit: number;
  ros: number;
  rob: number;
}

interface StockInformationTabsProps {
  warehouse: string;
}

const StockInformationTabs:React.FC<StockInformationTabsProps> = ({warehouse}) => {
  const [chosenTab, setChosenTab] = useState<string>("stock-tab");
  const [districtData, setDistrictData] = useState<DistrictStockModel[]>([]); // To store mapped data
  const [tabLoadingStates, setTabLoadingStates] = useState({
    "stock-tab": false,
    "usage-tab": false,
    "transaction-tab": false,
    "analysis-tab": false,
  }); // Loading state for each tab
  const [error, setError] = useState<string | null>(null); // Error state

  const { user } = useAuth();
  const param = useParams();

  // Handle tab change
  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    setChosenTab(buttonId); // Update the chosen tab
  };


  const fetchStockData = async () => {
    // Set loading state for the current tab
    setTabLoadingStates((prev) => ({ ...prev, "stock-tab": true }));
    setError(null); // Clear any previous errors

    // Call the API to fetch data
    const { data, error } = await fetchDistrictStockData(user!.lastActiveDistrict, param.id!, warehouse);

    if (error) {
      setError("Failed to fetch data.");
    } else {
      // Map data to DistrictStockModel interface
      const mappedData: DistrictStockModel[] = data!.map((item) => ({
        warehouse: item.warehouse,
        soh: item.soh,
        avg: item.avb,
        din: item.din,
        dout: item.dout,
        mit: item.mit,
        ros: item.ros,
        rob: item.rob,
      }));
      setDistrictData(mappedData);
    }

    // Set loading state to false once data is fetched
    setTimeout(() => {
      setTabLoadingStates((prev) => ({ ...prev, "stock-tab": false }));
    }, 1000);
    
  };

  // Fetch district stock data
  useEffect(() => {
  const fetchData = async () => {
    // Set loading state for the current tab
    setTabLoadingStates((prev) => ({ ...prev, "stock-tab": true }));
    setError(null); // Clear any previous errors

    // Call the API to fetch data
    const { data, error } = await fetchDistrictStockData(user!.lastActiveDistrict, param.id!,warehouse);

    if (error) {
      setError("Failed to fetch data.");
    } else {
      // Map data to DistrictStockModel interface
      const mappedData: DistrictStockModel[] = data!.map((item) => ({
        warehouse: item.warehouse,
        soh: item.soh,
        avg: item.avb,
        din: item.din,
        dout: item.dout,
        mit: item.mit,
        ros: item.ros,
        rob: item.rob,
      }));
      setDistrictData(mappedData);
    }

    // Set loading state to false once data is fetched
    setTimeout(() => {
      setTabLoadingStates((prev) => ({ ...prev, "stock-tab": false }));
    }, 1000);
    
  };

   
    fetchData();

  },[param.id, user, warehouse]); // Fetch data when chosenTab changes

  const handleDefaultActivate = async (regNumber: string) => {
    try {
      console.log(`Activating reg number: ${regNumber}`);
  
      // Set loading state for the "stock-tab"
      setTabLoadingStates((prev) => ({ ...prev, "stock-tab": true }));
  
      // Call the API to activate the reg number
      await defaultActivateRegnumberToDistrict(regNumber, user!.lastActiveDistrict, warehouse);
  
      // Fetch updated data after activation
      await fetchStockData();
  
      console.log(`Activation for reg number ${regNumber} successful.`);
    } catch (error) {
      console.error(`Failed to activate reg number ${regNumber}:`, error);
    } finally {
      // Reset loading state after operation
      setTabLoadingStates((prev) => ({ ...prev, "stock-tab": false }));
    }
  };
  
  return (
    <div className="stock__informations w-full border border-slate-200 rounded-lg overflow-hidden h-80">
      <div className="stock__info-tabs border-b border-gray-200 dark:border-gray-700">
        <ul className="flex text-sm font-medium text-center w-full">
          {[
            { id: "stock-tab", label: "Stock" },
            { id: "usage-tab", label: "Usage" },
            { id: "transaction-tab", label: "Transactions" },
            { id: "analysis-tab", label: "Analysis" },
          ].map((tab) => (
            <li key={tab.id} className="flex-1">
              <button
                id={tab.id}
                onClick={handleClickTab}
                className={`w-full inline-block p-2 border-b-2 ${
                  chosenTab === tab.id
                    ? "bg-slate-200 border-primary-light text-primary-light"
                    : "hover:bg-slate-100 hover:text-primary-light hover:border-primary-light border-transparent"
                }`}
                type="button"
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg dark:bg-gray-800 h-full w-full flex justify-start items-start p-1">
        {/* Display loading skeleton for stock-tab */}
        {chosenTab === "stock-tab" && tabLoadingStates["stock-tab"] && (
          <div className="w-full flex flex-col gap-2 justify-start items-start p-4">
            <Skeleton className="w-full h-16" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        )}
        {/* Display error message for stock-tab */}
        {chosenTab === "stock-tab" && error && (
          <div className="w-full h-full flex justify-center items-center text-red-500">
            <p>{error}</p>
          </div>
        )}
        {/* Show content once data is loaded */}
        {chosenTab === "stock-tab" && !tabLoadingStates["stock-tab"] && !error && (
          <TabStock reg_number={param.id} districtData={districtData} district={user!.lastActiveDistrict} warehouse={warehouse} error={null} onActivate={(e:string)=>handleDefaultActivate(e)} />
        )}

        {/* Display loading skeleton for other tabs */}
        {chosenTab === "usage-tab" && tabLoadingStates["usage-tab"] && (
          <div className="w-full flex justify-center items-center p-4">
            <Skeleton className="w-full h-64" />
          </div>
        )}
        {chosenTab === "transaction-tab" && tabLoadingStates["transaction-tab"] && (
          <div className="w-full flex justify-center items-center p-4">
            <Skeleton className="w-full h-64" />
          </div>
        )}
        {chosenTab === "analysis-tab" && tabLoadingStates["analysis-tab"] && (
          <div className="w-full flex justify-center items-center p-4">
            <Skeleton className="w-full h-64" />
          </div>
        )}

        {/* Show content for other tabs */}
        {chosenTab === "usage-tab" && !tabLoadingStates["usage-tab"] && <TabUsage />}
        {chosenTab === "transaction-tab" && !tabLoadingStates["transaction-tab"] && <TabTransaction />}
        {chosenTab === "analysis-tab" && !tabLoadingStates["analysis-tab"] && <TabAnalysis />}
      </div>
    </div>
  );
};

export default StockInformationTabs;
