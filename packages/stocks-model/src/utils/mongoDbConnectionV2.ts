// Connection URL
import { MongoClient } from "mongodb";
import { injectable } from "inversify";

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  useUnifiedTopology: true,
};

export interface Connection {
  init: () => Promise<void>;
  getClient: () => Promise<MongoClient>;
  close: () => Promise<void>;
}

@injectable()
class MongoDbConnection implements Connection {
  url: string;
  connectionInstance: MongoClient | null = null;
  constructor(url: string) {
    this.url = url;
  }

  async init() {
    if (this.connectionInstance) {
      return;
    }
    const client = new MongoClient(this.url, config);
    await client.connect();

    this.connectionInstance = client;
  }

  async getClient(): Promise<MongoClient> {
    this.init();

    if (!this.connectionInstance) {
      throw new Error("Missing connection instance");
    }
    return this.connectionInstance;
  }

  async close(): Promise<void> {
    if (!this.connectionInstance) {
      throw new Error("Missing connection instance");
    }

    await this.connectionInstance.close();
  }
}

export default MongoDbConnection;
