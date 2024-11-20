import React, { useState } from "react";
import TabStock from "./TabStock";
import TabUsage from "./TabUsage";
import TabTransaction from "./TabTransaction";
import TabAnalysis from "./TabAnalysis";

const StockInformationTabs = () => {
  const [chosenTab, setChosenTab] = useState<string>("stock-tab");

  const handleClickTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    setChosenTab(buttonId); // Update the chosen tab
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

      <div className="rounded-lg dark:bg-gray-800 h-full w-full flex justify-start items-start p-4">
        {chosenTab === "stock-tab" && <TabStock />}
        {chosenTab === "usage-tab" && <TabUsage />}
        {chosenTab === "transaction-tab" && <TabTransaction />}
        {chosenTab === "analysis-tab" && <TabAnalysis />}
      </div>
    </div>
  );
};

export default StockInformationTabs;
