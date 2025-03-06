// src/utils/authUtils.ts
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/api/repository/supabase";

// Utility function for generating a unique access token
export const generateUniqueAccessToken = async () => {
  let newAccessToken = uuidv4();

  // Check if the generated UUID already exists in the public_users table
  let { data: existingTokens, error } = await supabase
    .from('public_users')
    .select('access_token')
    .eq('access_token', newAccessToken);

  if (error) {
    console.error("Error checking existing access token:", error.message);
    throw error;
  }

  while (existingTokens && existingTokens.length > 0) {
    newAccessToken = uuidv4();
    ({ data: existingTokens, error } = await supabase
      .from('public_users')
      .select('access_token')
      .eq('access_token', newAccessToken));

    if (error) {
      console.error("Error checking existing access token:", error.message);
      throw error;
    }
  }

  return newAccessToken;
};
