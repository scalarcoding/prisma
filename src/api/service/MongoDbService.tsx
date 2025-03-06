// api/service/MongoDbService.ts
import { ApiService } from "./ApiService";

export class MongoDBService implements ApiService {
  async fetchData(): Promise<unknown> {
    // MongoDB specific logic here
    return "MongoDB data";
  }
}
