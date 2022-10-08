import type { StockSourceWithId } from "@pibernetwork/model/src/types";
import slug from "slug";
import {
  connection,
  segmentRepository,
  sectorRepository,
  subSectorRepository,
  companyRepository,
  sourceRepository,
} from "@pibernetwork/model/src/containers/root";

async function isInsertedCompany(name: string): Promise<boolean> {
  const companyDb = await companyRepository.queryOne({
    name: { $eq: name },
  });

  return companyDb !== null ? true : false;
}

export async function syncCompanies() {
  await connection.init();

  const stocks: StockSourceWithId[] = await sourceRepository.queryAll({});

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

  await connection.close();
  console.log("Done");
}
