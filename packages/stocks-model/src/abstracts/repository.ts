import mongoDbConnection from "../utils/mongoDbConnection";
import type {
  Collection,
  MongoClient,
  Document,
  WithId,
  ObjectId,
  Filter,
} from "mongodb";

export abstract class MongoRepository<T extends Document> {
  connection: string | null | undefined;
  collection: Collection<T> | null = null;
  client: MongoClient | null = null;
  collectionName: string | null = null;

  constructor(connection: string | null | undefined) {
    this.connection = connection;
  }

  async init() {
    if (typeof this.connection !== "string") {
      throw new Error(`Missing connection ${this.connection}`);
    }
    if (!this.collectionName) {
      throw new Error("Missing collection name");
    }
    if (!this.collection) {
      const { getInstance } = mongoDbConnection;
      this.client = await getInstance(this.connection);
      const db = this.client.db("investments");
      const collection = db.collection<T>(this.collectionName);
      this.collection = collection;
    }
  }

  async deleteMany() {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection");
    }
    return await this.collection.deleteMany({});
  }
}
