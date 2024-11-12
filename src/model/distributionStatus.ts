// Define the DistributionStatus type
export type DistributionStatus = {
    district_code: string;
    available: number;
    owned_soh: number;
    consigned_soh: number;
    total_soh: number;
    in_transit: number;
    total_assets: number;
  };