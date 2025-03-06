// api/service/ApiService.ts
export interface ApiService {
  fetchData(): Promise<unknown>; // Example method, you can have other methods like `create`, `update`, etc.
}
