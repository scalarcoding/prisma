import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as per your project structure

// Type definitions
interface StockItem {
  name: string;
  sku: string;
  category: string;
  price: string;
  quantity: number;
  lastRestock: string;
  salesHistory: number[]; // Array of sales data
}

// Helper functions for statistical calculations
const mean = (data: number[]): number => {
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
};

const meanAbsoluteDeviation = (data: number[]): number => {
  const avg = mean(data);
  const sum = data.reduce((acc, val) => acc + Math.abs(val - avg), 0);
  return sum / data.length;
};

const standardDeviation = (data: number[]): number => {
  const avg = mean(data);
  const variance = data.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / data.length;
  return Math.sqrt(variance);
};

const coefficientOfVariation = (data: number[]): number => {
  const avg = mean(data);
  const sd = standardDeviation(data);
  return (sd / avg) * 100; // As percentage
};

const totalSales = (data: number[]): number => {
  return data.reduce((acc, val) => acc + val, 0);
};

const minSales = (data: number[]): number => {
  return Math.min(...data);
};

const maxSales = (data: number[]): number => {
  return Math.max(...data);
};

const salesRange = (data: number[]): number => {
  return maxSales(data) - minSales(data);
};

const TabAnalysis = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stockItem, setStockItem] = useState<StockItem | null>(null); // State for stock item
  const [avgSales, setAvgSales] = useState<number | null>(null); // State for average sales
  const [madSales, setMadSales] = useState<number | null>(null); // State for MAD
  const [sdSales, setSdSales] = useState<number | null>(null); // State for SD
  const [cvSales, setCvSales] = useState<number | null>(null); // Coefficient of Variation
  const [totalSalesValue, setTotalSales] = useState<number | null>(null); // Total Sales
  const [minSalesValue, setMinSales] = useState<number | null>(null); // Minimum Sales
  const [maxSalesValue, setMaxSales] = useState<number | null>(null); // Maximum Sales
  const [salesRangeValue, setSalesRange] = useState<number | null>(null); // Sales Range

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Simulating API call to fetch stock item details
      const fetchedStockItem: StockItem = {
        name: "Example Product",
        sku: "ABC123",
        category: "Electronics",
        price: "$199.99",
        quantity: 50,
        lastRestock: "2024-11-10",
        salesHistory: [30, 40, 50, 60, 70], // Placeholder for sales data
      };
      setStockItem(fetchedStockItem);
      setIsLoading(false); // Stop loading after data is fetched
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Recalculate statistics when stockItem changes
  useEffect(() => {
    if (stockItem && stockItem.salesHistory.length > 0) {
      const salesHistory = stockItem.salesHistory;
      setAvgSales(mean(salesHistory));
      setMadSales(meanAbsoluteDeviation(salesHistory));
      setSdSales(standardDeviation(salesHistory));
      setCvSales(coefficientOfVariation(salesHistory));
      setTotalSales(totalSales(salesHistory));
      setMinSales(minSales(salesHistory));
      setMaxSales(maxSales(salesHistory));
      setSalesRange(salesRange(salesHistory));
    }
  }, [stockItem]); // Runs when stockItem changes

  // Safety check when rendering
  if (isLoading || !stockItem) {
    return (
      <div className="flex flex-col h-full gap-2 p-2 w-full">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-scroll">
      <div className="p-2 space-y-6">
        {/* Statistical Analysis */}
        
        <div className="relative overflow-x-auto">
  {/* Scrollable container for the table body */}
  <div className="max-h-[400px] overflow-y-auto">
    <table className="min-w-full table-auto">
      {/* Header with sticky positioning */}
      <thead className="sticky top-0 bg-gray-100 z-2">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Inventory Metric</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Value</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Average Sales</td>
          <td className="px-4 py-2 text-sm text-gray-700">{avgSales !== null ? avgSales.toFixed(2) : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Mean Absolute Deviation (MAD)</td>
          <td className="px-4 py-2 text-sm text-gray-700">{madSales !== null ? madSales.toFixed(2) : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Standard Deviation (SD)</td>
          <td className="px-4 py-2 text-sm text-gray-700">{sdSales !== null ? sdSales.toFixed(2) : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Coefficient of Variation (CV)</td>
          <td className="px-4 py-2 text-sm text-gray-700">{cvSales !== null ? cvSales.toFixed(2) : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Total Sales</td>
          <td className="px-4 py-2 text-sm text-gray-700">{totalSalesValue !== null ? totalSalesValue.toFixed(2) : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Minimum Sales</td>
          <td className="px-4 py-2 text-sm text-gray-700">{minSalesValue !== null ? minSalesValue : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Maximum Sales</td>
          <td className="px-4 py-2 text-sm text-gray-700">{maxSalesValue !== null ? maxSalesValue : "Loading..."}</td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm text-gray-700">Sales Range</td>
          <td className="px-4 py-2 text-sm text-gray-700">{salesRangeValue !== null ? salesRangeValue : "Loading..."}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


      </div>
    </div>
  );
};

export default TabAnalysis;
