import {
  Company,
  CompanyWithId,
  Portfolio,
  PortfolioWithId,
  Repository,
  Sector,
  SectorWithId,
  Segment,
  SegmentWithId,
  SubSector,
  SubSectorWithId,
  Ticket,
  TicketWithId,
} from "@pibernetwork/stocks-model/src/types";
import { WithId } from "mongodb";

import DataLoader from "dataloader";

import { Document, ObjectId } from "mongodb";
import { DataLoaders } from "src/types/dataloader";

export class DataloaderService {
  constructor(
    private companyRepository: Repository<Company>,
    private sectorRepository: Repository<Sector>,
    private subSectorRepository: Repository<SubSector>,
    private segmentRepository: Repository<Segment>,
    private ticketRepository: Repository<Ticket>,
    private portfolioRepository: Repository<Portfolio>
  ) {}

  _mapResultToIds<T extends Document>(
    _ids: readonly ObjectId[],
    documents: WithId<T>[]
  ): WithId<T>[] {
    return _ids.map((companyId) => {
      const documentsDb = documents.find(
        (company: WithId<T>) => company._id.equals(companyId) || false
      );

      if (!documentsDb) {
        throw new Error("Graphlql Error on map results to id");
      }
      return documentsDb;
    });
  }

  getLoaders(): DataLoaders {
    return {
      companiesLoader: new DataLoader<ObjectId, CompanyWithId>(
        async (keys: readonly ObjectId[]): Promise<CompanyWithId[]> => {
          const companies = await this.companyRepository.queryAllByIds(keys);
          return this._mapResultToIds<CompanyWithId>(keys, companies);
        }
      ),
      sectorsLoader: new DataLoader<ObjectId, SectorWithId>(
        async (keys: readonly ObjectId[]) => {
          const companies = await this.sectorRepository.queryAllByIds(keys);
          return this._mapResultToIds<SectorWithId>(keys, companies);
        }
      ),
      subSectorsLoader: new DataLoader<ObjectId, SubSectorWithId>(
        async (keys: readonly ObjectId[]) => {
          const companies = await this.subSectorRepository.queryAllByIds(keys);
          return this._mapResultToIds<SubSectorWithId>(keys, companies);
        }
      ),
      segmentsLoader: new DataLoader<ObjectId, SegmentWithId>(
        async (keys: readonly ObjectId[]) => {
          const companies = await this.segmentRepository.queryAllByIds(keys);
          return this._mapResultToIds<SegmentWithId>(keys, companies);
        }
      ),
      ticketsLoader: new DataLoader<ObjectId, TicketWithId>(
        async (keys: readonly ObjectId[]) => {
          console.log("tickets");
          const tickets = await this.ticketRepository.queryAllByIds(keys);
          console.log(keys, tickets);
          return this._mapResultToIds<TicketWithId>(keys, tickets);
        }
      ),
      portfoliosLoader: new DataLoader<ObjectId, PortfolioWithId>(
        async (keys: readonly ObjectId[]) => {
          const companies = await this.portfolioRepository.queryAllByIds(keys);

          return this._mapResultToIds<PortfolioWithId>(keys, companies);
        }
      ),
    };
  }
}
