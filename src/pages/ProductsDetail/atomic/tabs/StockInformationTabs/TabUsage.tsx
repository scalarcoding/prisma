import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust path as per your project structure
import { CDUChart } from "./CDUChart";

const TabUsage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  useEffect(() => {
    setIsLoading(true); // Start loading
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 500ms
    }, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

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
        <div>
          <CDUChart/>
        </div>
      )}
    </div>
  );
};

export default TabUsage;
