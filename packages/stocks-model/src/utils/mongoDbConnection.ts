// Connection URL
import { MongoClient } from "mongodb";

type GetInstance = (url: string | null) => Promise<MongoClient>;

const config = {
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
  useUnifiedTopology: true,
};

interface MongoDbSingleton {
  getInstance: GetInstance;
}

function singleMongoDb(): MongoDbSingleton {
  let connectionInstance: MongoClient;

  async function getInstance(url: string | null) {
    if (!url) {
      throw new Error("Missing URL");
    }
    if (connectionInstance) {
      return connectionInstance;
    }

    const client = new MongoClient(url, config);
    await client.connect();

    connectionInstance = client;
    return client;
  }

  return {
    getInstance,
  };
}

export default singleMongoDb();
