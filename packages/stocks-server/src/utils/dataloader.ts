import {
  CompanyWithId,
  SectorWithId,
  SegmentWithId,
  SubSectorWithId,
  TicketWithId,
} from "@pibernetwork/stocks-model/src/types";

import DataLoader from "dataloader";

import type { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import type { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";

import { Document, ObjectId } from "mongodb";
import { DataLoaders } from "src/types/dataloader";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";

export class DataloaderService {
  constructor(
    private companyRepository: CompanyRepository,
    private sectorRepository: SectorRepository,
    private subSectorRepository: SubSectorRepository,
    private segmentRepository: SegmentRepository,
    private ticketRepository: TicketRepository
  ) {}

  _mapResultToIds<T extends Document>(
    companyIds: readonly ObjectId[],
    companies: T[]
  ): T[] {
    return companyIds.map((companyId) => {
      const companyDb = companies.find(
        (company: T) => company._id.equals(companyId) || false
      );

      if (!companyDb) {
        throw new Error("Graphlql Error on map results to id");
      }
      return companyDb;
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
          const companies = await this.ticketRepository.queryAllByIds(keys);
          return this._mapResultToIds<TicketWithId>(keys, companies);
        }
      ),
    };
  }
}
