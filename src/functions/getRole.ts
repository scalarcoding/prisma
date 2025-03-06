import { supabase } from "@/api/repository/supabase";

interface RoleProps {
  nrp?: string;
}

const getRole = async ({ nrp }: RoleProps): Promise<string | null> => {
  try {
    // Fetch user role based on the `nrp`
    const { data: positionData, error: positionError } = await supabase
      .from('manpower')
      .select('position, role(incumbent)')
      .eq('nrp', nrp)
      .single(); // Ensures only one result is fetched

    if (positionError) {
      console.error("Error fetching role:", positionError.message);
      return null;
    }

    // Safely extract role
    const role = positionData?.role[0].incumbent || null;
    return role;
  } catch (error) {
    console.error("Unexpected error fetching role:", error);
    return null;
  }
};

export default getRole;
