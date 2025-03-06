// hooks/useApi.ts

import { MongoDBService } from "@/api/service/MongoDbService";
import { PostgreSQLService } from "@/api/service/PostgreSQLService";
import { SupabaseService } from "@/api/service/SupabaseService";
import { ApiService } from "@/api/service/ApiService";

// Define the backend type
type Backend = 'supabase' | 'mongodb' | 'postgresql';  // Type for the backend selector

// Explicitly declare the backend type as one of the available backends
const backend: Backend = 'supabase'; // You can change it to 'mongodb' or 'postgresql' to test

let apiService: ApiService;

switch (backend) {
  case 'mongodb':
    apiService = new MongoDBService(); // MongoDBService implements ApiService
    break;
  case 'postgresql':
    apiService = new PostgreSQLService(); // PostgreSQLService implements ApiService
    break;
  case 'supabase':
  default:
    apiService = new SupabaseService(); // SupabaseService implements ApiService
    break;
}

// Return the correct service instance
export const useApi = (): ApiService => apiService;
