// Connection URL
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';

type GetInstance = () => Promise<MongoClient>;

interface MongoDbSingleton {
  getInstance: GetInstance;
}

function singleMongoDb(): MongoDbSingleton {
  let connectionInstance: MongoClient;

  async function getInstance() {
    if (connectionInstance) {
      return connectionInstance;
    }

    const client = new MongoClient(url);
    await client.connect();

    connectionInstance = client;
    return client;
  }

  return {
    getInstance
  };
}

export default singleMongoDb();
