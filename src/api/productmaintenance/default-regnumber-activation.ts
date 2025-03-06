import { supabase } from "../repository/supabase";

// Define the API function to insert into the 'district stock' table
export const defaultActivateRegnumberToDistrict = async (regNumber: string, district: string, warehouse: string) => {
    try {
        const { error:disterror } = await supabase
            .from('district_config') // The table name
            .insert([
                {
                    district: district,
                    reg_number: regNumber,
                },
            ]);

        if (disterror) {
            throw new Error(disterror.message);
        }

        const { error:stockerror } = await supabase
            .from('district_stock') // The table name
            .insert([
                {
                    ds_wh_rn : `${district}${warehouse}${regNumber}`,
                    district: district,
                    reg_number: regNumber,
                    warehouse: warehouse,
                },
            ]);

        if (stockerror) {
            throw new Error(stockerror.message);
        }
    } catch (error) {
        console.error('Error inserting into district stock:', error);
        throw error; // Optionally, rethrow to handle it where the function is called
    }
};
