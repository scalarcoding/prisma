import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as per your project structure
import { supabase } from "@/api/repository/supabase";


interface StockMovement {
  id: number;
  created_at: string;
  issued_at: string | null;
  district: string | null;
  warehouse: string | null;
  reg_number: number | null;
  trans_reference: string | null;
  soh_before: number | null;
  qty_movement: number | null;
  soh_after: number | null;
  trans_type: string | null;
  remark: string | null;
}


const TabTransaction = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    const fetchStockMovements = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("stock_movement")
          .select("*")
          .order("created_at", { ascending: false }); // Fetch data and sort by created_at

        if (error) throw error;
        setStockMovements(data || []);
      } catch (error) {
        console.error("Error fetching stock movements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStockMovements();
  }, []);

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
        <div className="overflow-x-auto max-h-[400px] pb-4">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Reference</th>
                <th className="px-4 py-2 text-left">Qty</th>
                <th className="px-4 py-2 text-left">SOH Before</th>
                <th className="px-4 py-2 text-left">SOH After</th>
                <th className="px-4 py-2 text-left">District</th>
                <th className="px-4 py-2 text-left">Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-4 py-2">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{row.trans_type}</td>
                  <td className="px-4 py-2">{row.trans_reference}</td>
                  <td className="px-4 py-2">{row.qty_movement}</td>
                  <td className="px-4 py-2">{row.soh_before}</td>
                  <td className="px-4 py-2">{row.soh_after}</td>
                  <td className="px-4 py-2">{row.district}</td>
                  <td className="px-4 py-2">{row.warehouse}</td>
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
