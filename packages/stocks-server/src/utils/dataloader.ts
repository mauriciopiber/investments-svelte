import {
  CompanyWithId,
  DataLoaders,
} from "@pibernetwork/stocks-model/src/types";
import DataLoader from "dataloader";

function _mapResultToIds(
  companyIds: readonly ObjectId[],
  companies: CompanyWithId[]
): CompanyWithId[] {
  return companyIds.map((companyId) => {
    const companyDb = companies.find(
      (company: CompanyWithId) => company._id.equals(companyId) || false
    );

    if (!companyDb) {
      throw new Error("Graphlql Error on map results to id");
    }
    return companyDb;
  });
}

import type { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { ObjectId } from "mongodb";

export class DataloaderService {
  companyRepository: CompanyRepository;
  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
  }

  getLoaders(): DataLoaders {
    const companiesLoader = this.createCompaniesLoader();
    return {
      companiesLoader,
    };
  }

  createCompaniesLoader() {
    return new DataLoader<ObjectId, CompanyWithId>(
      async (keys: readonly ObjectId[]) => {
        const companies = await this.companyRepository.queryAllByIds(keys);
        return _mapResultToIds(keys, companies);
      }
    );
  }
}
