import slug from "slug";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type {
  Company,
  StockWithId,
} from "@pibernetwork/stocks-model/src/types";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";

export async function syncCompanies() {
  const stockRepository = new StockRepository();

  const stocks: StockWithId[] = await stockRepository.queryAll({});
  const uniqueCompanies = [...new Set(stocks.map((item) => item.company))];

  const segmentRepository = new SegmentRepository();
  const subSectorRepository = new SubSectorRepository();
  const sectorRepository = new SectorRepository();

  const companiesModels: Company[] = [];

  for (const company of uniqueCompanies) {
    const firstCompanyStock = stocks.find((stock) => stock.company === company);

    if (!firstCompanyStock) {
      throw new Error();
    }

    const { segment, sector, subSector } = firstCompanyStock;

    const sectorModel = await sectorRepository.queryOne({
      name: { $eq: sector },
    });

    if (!sectorModel) {
      throw new Error();
    }

    const subSectorModel = await subSectorRepository.queryOne({
      name: { $eq: subSector },
    });

    if (!subSectorModel) {
      throw new Error();
    }

    const segmentModel = await segmentRepository.queryOne({
      name: { $eq: segment },
    });

    if (!segmentModel) {
      throw new Error();
    }

    companiesModels.push({
      name: company,
      slug: slug(company),
      segmentId: segmentModel._id,
      subSectorId: subSectorModel._id,
      sectorId: sectorModel._id,
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    });
  }
  // const companies = uniqueCompanies.map((company) => {
  //   const firstCompanyStock = stocks.find((stock) => stock.company === company);

  //   if (!firstCompanyStock) {
  //     throw new Error();
  //   }

  //   const { segment, sector, subSector } = firstCompanyStock;

  //   return {
  //     name: company,
  //     slug: slug(company),
  //     segment,
  //     sector,
  //     subSector,
  //   };
  // });

  const companyRepository = new CompanyRepository();

  await companyRepository.insertMany(companiesModels);

  await companyRepository.close();

  await segmentRepository.close();
  await subSectorRepository.close();
  await sectorRepository.close();
  console.log("Done");
}
