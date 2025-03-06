// api/service/PostgreSQLService.ts
import { ApiService } from "./ApiService";

export class PostgreSQLService implements ApiService {
  async fetchData(): Promise<unknown> {
    // PostgreSQL specific logic here
    return "PostgreSQL data";
  }
}
