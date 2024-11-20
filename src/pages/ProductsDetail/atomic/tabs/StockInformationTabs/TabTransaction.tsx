import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as per your project structure

const TabTransaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    setIsLoading(true); // Start loading
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 500ms
    }, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const tableData = [
    { date: "2024-01-01", type: "ISS", docNum: "001", qty: 10, value: 100 },
    { date: "2024-02-01", type: "SRO", docNum: "002", qty: 15, value: 150 },
    { date: "2024-03-01", type: "SCR", docNum: "003", qty: 8, value: 80 },
    { date: "2024-04-01", type: "ISS", docNum: "004", qty: 20, value: 200 },
    { date: "2024-05-01", type: "ISS", docNum: "005", qty: 12, value: 120 },
    { date: "2024-01-01", type: "ISS", docNum: "001", qty: 10, value: 100 },
    { date: "2024-02-01", type: "SRO", docNum: "002", qty: 15, value: 150 },
    { date: "2024-03-01", type: "SCR", docNum: "003", qty: 8, value: 80 },
    { date: "2024-04-01", type: "ISS", docNum: "004", qty: 20, value: 200 },
    { date: "2024-05-01", type: "ISS", docNum: "005", qty: 12, value: 120 },
    { date: "2024-01-01", type: "ISS", docNum: "001", qty: 10, value: 100 },
    { date: "2024-02-01", type: "SRO", docNum: "002", qty: 15, value: 150 },
    { date: "2024-03-01", type: "SCR", docNum: "003", qty: 8, value: 80 },
    { date: "2024-04-01", type: "ISS", docNum: "004", qty: 20, value: 200 },
    { date: "2024-05-01", type: "ISS", docNum: "005", qty: 12, value: 120 },
    { date: "2024-01-01", type: "ISS", docNum: "001", qty: 10, value: 100 },
    { date: "2024-02-01", type: "SRO", docNum: "002", qty: 15, value: 150 },
    { date: "2024-03-01", type: "SCR", docNum: "003", qty: 8, value: 80 },
    { date: "2024-04-01", type: "ISS", docNum: "004", qty: 20, value: 200 },
    { date: "2024-05-01", type: "ISS", docNum: "005", qty: 12, value: 120 },
    // Add more rows as needed
  ];

  return (
    <div className="h-full w-full overflow-hidden">
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
        <div className="overflow-x-auto max-h-[400px] pb-4"> {/* Added padding-bottom */}
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Doc Num</th>
                <th className="px-4 py-2 text-left">Qty</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {tableData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.docNum}</td>
                  <td className="px-4 py-2">{row.qty}</td>
                  <td className="px-4 py-2">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TabTransaction;
