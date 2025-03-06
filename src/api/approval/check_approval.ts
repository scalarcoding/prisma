import { supabase } from "../repository/supabase";
import { ApprovalStatus } from "./approval_status";

interface ApprovalStatusProps {
  total: number;
  p_district: string;
  p_user_id: string;
}


const checkApprovalStatus = async ({
  total,
  p_district,
  p_user_id,
}: ApprovalStatusProps): Promise<ApprovalStatus | null> => {
  const query = {
    total: total,
    p_district: p_district,
    p_user_id: p_user_id,
  };

  console.log(query);

  try {
    const { data, error } = await supabase.rpc("get_approval_status", query);

    if (error) {
      console.error("Error fetching approval status:", error);
      return null; // Return null on error
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const [approvalStatus] = data;
      return {
        approval_status: approvalStatus.approval_status,
        incumbent_description: approvalStatus.incumbent_description,
      };
    }

    // Return null if no data is found
    return null;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};

export { checkApprovalStatus };
