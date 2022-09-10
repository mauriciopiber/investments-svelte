import DataLoader from "dataloader";
import { Company } from "@pibernetwork/stocks-model/src/types";
import { ObjectId } from "mongodb";

export interface DataLoaders {
  companiesLoader: DataLoader<ObjectId, Company>;
}
