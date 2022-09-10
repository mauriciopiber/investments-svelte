import mongoDbConnection from "../utils/mongoDbConnection";
import type { Collection, MongoClient, Document } from "mongodb";

export abstract class MongoRepository<T extends Document> {
  connection: string | null | undefined;
  collection: Collection<T> | null = null;
  client: MongoClient | null = null;
  collectionName: string | null = null;

  constructor(connection: string | null | undefined) {
    console.log("constructor", connection);
    this.connection = connection;
  }

  async init() {
    if (typeof this.connection !== "string") {
      console.log(this.connection);
      throw new Error("Missing connection 123");
    }
    if (!this.collectionName) {
      throw new Error("Missing collection name 123");
    }
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance(this.connection);
      const db = this.client.db("investments");
      const collection = db.collection<T>(this.collectionName);
      this.collection = collection;
    }
  }
}
