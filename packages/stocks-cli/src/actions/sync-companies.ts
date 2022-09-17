import slug from "slug";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type { StockSourceWithId } from "@pibernetwork/stocks-model/src/types";
import { SourceRepository } from "@pibernetwork/stocks-model/src/repository/source";
import dotenv from "dotenv";
dotenv.config();

const segmentRepository = new SegmentRepository(
  process.env.DATABASE_CONNECTION
);
const subSectorRepository = new SubSectorRepository(
  process.env.DATABASE_CONNECTION
);
const sectorRepository = new SectorRepository(process.env.DATABASE_CONNECTION);
const companyRepository = new CompanyRepository(
  process.env.DATABASE_CONNECTION
);

async function isInsertedCompany(name: string): Promise<boolean> {
  const companyDb = await companyRepository.queryOne({
    name: { $eq: name },
  });

  return companyDb !== null ? true : false;
}

export async function syncCompanies() {
  const stockRepository = new SourceRepository(process.env.DATABASE_CONNECTION);

  const stocks: StockSourceWithId[] = await stockRepository.queryAll({});

  for (const { sector, subSector, segment, company, name, code } of stocks) {
    if (!sector || !subSector || !segment || !company || !name || !code) {
      throw new Error();
    }
    const insertedCompany = await isInsertedCompany(name);

    if (insertedCompany) {
      continue;
    }

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

    await companyRepository.insertOne({
      company: company,
      name: name,
      code: code,
      slug: slug(name),
      segmentId: segmentModel._id,
      subSectorId: subSectorModel._id,
      sectorId: sectorModel._id,
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    });
  }

  await companyRepository.close();

  await segmentRepository.close();
  await subSectorRepository.close();
  await sectorRepository.close();
  console.log("Done");
}
