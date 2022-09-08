import { StockModel, StockModelFilter, StockModelSort } from "./model";

export interface StockService {
  saveOne: (stock: StockModel) => Promise<void>;
  saveMany: (stocks: StockModel[]) => Promise<void>;
  queryOne: (
    filters: StockModelFilter,
    sort: StockModelSort
  ) => Promise<StockModel>;
  queryMany: (
    filters: StockModelFilter,
    sort: StockModelSort
  ) => Promise<StockModel[]>;
  queryOneBySlug: (slug: string) => Promise<StockModel>;
}
