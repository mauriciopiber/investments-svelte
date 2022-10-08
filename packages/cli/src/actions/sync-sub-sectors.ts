import slug from "slug";

import type { StockSourceWithId } from "@pibernetwork/model/src/types";

import {
  connection,
  sectorRepository,
  subSectorRepository,
  sourceRepository,
} from "@pibernetwork/model/src/containers/root";

async function isInsertedSubSector(
  sector: string,
  subSector: string
): Promise<boolean> {
  const sectorDb = await sectorRepository.queryOne({
    name: { $eq: sector },
  });

  if (!sectorDb) {
    throw new Error("Sector is required but not found");
  }

  const subSectorDb = await subSectorRepository.queryOne({
    name: { $eq: subSector },
    sectorId: { $eq: sectorDb._id },
  });

  return subSectorDb !== null ? true : false;
}

export async function syncSubSectors() {
  await connection.init();
  const stocks: StockSourceWithId[] = await sourceRepository.queryAll({});

  const subSectors = stocks.map((stock) => ({
    sector: stock.sector,
    subSector: stock.subSector,
  }));

  for (const { sector, subSector } of subSectors) {
    if (!sector || !subSector) {
      throw new Error();
    }
    const uniqueSubSector = await isInsertedSubSector(sector, subSector);

    if (uniqueSubSector) {
      continue;
    }

    const sectorModel = await sectorRepository.queryOne({
      name: { $eq: sector },
    });

    if (!sectorModel) {
      throw new Error();
    }

    const subSectorEntry = {
      name: subSector,
      slug: slug(subSector),
      sectorId: sectorModel._id,
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    };

    await subSectorRepository.insertOne(subSectorEntry);
  }
  await connection.close();
}
