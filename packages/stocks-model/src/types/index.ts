import type { Filter, MongoClient, ObjectId, WithId } from "mongodb";

export * from "./sector";
export * from "./sub-sector";
export * from "./segment";
export * from "./company";
export * from "./ticket";
export * from "./query";
export * from "./source";
export * from "./search";
export * from "./portfolio";
export * from "./income";
export * from "./indicator";

export interface Repository<T> {
  collectionName: string;
  insertMany: (docs: T[]) => Promise<void>;
  insertOne: (doc: T) => Promise<void>;
  updateOne: (_id: ObjectId, values: Partial<T>) => Promise<void>;
  queryAllByIds: (ids: readonly ObjectId[]) => Promise<WithId<T>[]>;
  queryOne: (filters: Filter<T>) => Promise<WithId<T> | null>;
  queryAll: (filters: Filter<T>) => Promise<WithId<T>[]>;
  init: () => Promise<void>;
  deleteMany: () => Promise<void>;
}

export interface RepositoryWithFilter<T> extends Repository<T> {
  getFilterRanges: () => void;
}

export interface Connection {
  init: () => Promise<void>;
  getClient: () => Promise<MongoClient>;
  close: () => Promise<void>;
}
