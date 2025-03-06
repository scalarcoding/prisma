import { supabase } from "@/api/repository/supabase";

 type FetchAllWarehouseInDistrictProps = {
    district: string;
  };
  
const fetchAllWarehouseInDistrict = async (
    { district }: FetchAllWarehouseInDistrictProps
  ): Promise<string[] | null> => {
    try {
      const { data, error } = await supabase
        .from("districts")
        .select("warehouse")
        .eq("code", district);
  
      if (error) {
        console.error("Error fetching warehouse:", error.message);
        return null;
      }
  
      if (!data || data.length === 0) {
        console.warn("No warehouses found for the given district.");
        return [];
      }
  
      const warehouseList = data[0].warehouse;
  
      if (!Array.isArray(warehouseList)) {
        console.error("Unexpected data format for warehouses.");
        return [];
      }
  
      return warehouseList;
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };


   const fetchMainWarehouse = async (
    { district }: FetchAllWarehouseInDistrictProps
  ): Promise<string | null> => {
    try {
      const warehouseList = await fetchAllWarehouseInDistrict({ district });
  
      if (!warehouseList || warehouseList.length === 0) {
        console.warn("No main warehouse found for the given district.");
        return null;
      }
  
      return warehouseList[0]; // Return the first warehouse in the list
    } catch (err) {
      console.error("Unexpected error while fetching the main warehouse:", err);
      return null;
    }
  };
  
  

  export { fetchAllWarehouseInDistrict, fetchMainWarehouse };