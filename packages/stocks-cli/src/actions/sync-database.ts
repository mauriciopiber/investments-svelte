// Connection URL
import { MongoClient } from "mongodb";

async function createConnection(url: string) {
  const client = new MongoClient(url, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
  });

  await client.connect();

  return client;
}

export async function syncDatabase() {
  const mirroFrom = process.env.MIRROR_FROM as string;
  const mirrorTo = process.env.MIRROR_TO as string;

  const db = "investments";

  const collections = [
    "sectors",
    "subsectors",
    "segments",
    "companies",
    "tickets",
  ];

  const connectionFrom = await createConnection(mirroFrom);
  const connectionTo = await createConnection(mirrorTo);

  const dbFrom = await connectionFrom.db(db);
  const dbTo = await connectionTo.db(db);

  // const connectionFrom = creat;

  for (const collection of collections) {
    const collectionFrom = dbFrom.collection(collection);
    const collectionTo = dbTo.collection(collection);

    const data = await collectionFrom.find({}).toArray();
    await collectionTo.insertMany(data);
  }

  await connectionFrom.close();
  await connectionTo.close();
}
