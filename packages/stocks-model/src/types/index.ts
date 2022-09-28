import type {
  Filter,
  MongoClient,
  ObjectId,
  SortDirection,
  WithId,
} from "mongodb";

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
export * from "./profile";

export interface Repository<T> {
  collectionName: string;
  insertMany: (docs: T[]) => Promise<void>;
  insertOne: (doc: T) => Promise<void>;
  updateOne: (_id: ObjectId, values: Partial<T>) => Promise<void>;
  queryAllByIds: (ids: readonly ObjectId[]) => Promise<WithId<T>[]>;
  queryOne: (filters: Filter<T>) => Promise<WithId<T> | null>;
  queryAll: (
    filters: Filter<T>,
    skip?: number,
    limit?: number,
    sortKey?: string,
    sortDirection?: SortDirection
  ) => Promise<WithId<T>[]>;
  init: () => Promise<void>;
  deleteMany: () => Promise<void>;
  count: () => Promise<number>;
}

export interface QueryResponse<T> {
  page: {
    current: number;
    items: number;
    start: number;
    end: number;
    next: number | null;
    prev: number | null;
    total: number;
  };
  items: WithId<T>[];
}

export interface QueryPage {
  current: number;
  perPage: number;
}

export interface QuerySort {
  key: string;
  direction: SortDirection;
}

export interface Service<T> {
  queryAll: (page: QueryPage, sort: QuerySort) => Promise<QueryResponse<T>>;
}

export interface RepositoryWithFilter<T> extends Repository<T> {
  getFilterRanges: () => void;
}

export interface Connection {
  init: () => Promise<void>;
  getClient: () => Promise<MongoClient>;
  close: () => Promise<void>;
}
