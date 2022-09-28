import type { Collection, MongoClient, Document } from "mongodb";
import { inject, injectable } from "inversify";
import { TYPES } from "../containers/types";
import type { Connection } from "../types";

@injectable()
export abstract class MongoRepository<T extends Document> {
  collection: Collection<T> | null = null;
  client: MongoClient | null = null;
  collectionName: string | null = null;
  private _connection: Connection;

  constructor(@inject(TYPES.Connection) connection: Connection) {
    this._connection = connection;
  }

  async init() {
    if (!this.collectionName) {
      throw new Error("Missing collection name");
    }

    if (!this.collection) {
      const client = await this._connection.getClient();
      const db = client.db("investments");
      const collection = db.collection<T>(this.collectionName);
      this.collection = collection;
    }
  }

  async deleteMany() {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection");
    }
    await this.collection.deleteMany({});
    return;
  }

  async count() {
    await this.init();
    if (!this.collection) {
      throw new Error("Missing connection");
    }
    return this.collection.count({});
  }
}
