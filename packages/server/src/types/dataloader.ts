import DataLoader from "dataloader";
import {
  CompanyWithId,
  SectorWithId,
  SegmentWithId,
  SubSectorWithId,
  TicketWithId,
  PortfolioWithId,
} from "@pibernetwork/model/src/types";
import { ObjectId } from "mongodb";

export interface DataLoaders {
  companiesLoader: DataLoader<ObjectId, CompanyWithId>;
  sectorsLoader: DataLoader<ObjectId, SectorWithId>;
  subSectorsLoader: DataLoader<ObjectId, SubSectorWithId>;
  segmentsLoader: DataLoader<ObjectId, SegmentWithId>;
  ticketsLoader: DataLoader<ObjectId, TicketWithId>;
  portfoliosLoader: DataLoader<ObjectId, PortfolioWithId>;
}
