import slug from "slug";

import type { StockSourceWithId } from "@pibernetwork/stocks-model/src/types";

import {
  connection,
  sectorRepository,
  sourceRepository,
} from "@pibernetwork/stocks-model/src/containers/root";

async function isInsertedSector(sector: string): Promise<boolean> {
  const sectorDb = await sectorRepository.queryOne({
    name: { $eq: sector },
  });

  return sectorDb !== null ? true : false;
}

export async function syncSectors() {
  await connection.init();

  const stocks: StockSourceWithId[] = await sourceRepository.queryAll({});

  for (const { sector } of stocks) {
    if (!sector) {
      throw new Error();
    }
    const uniqueSegment = await isInsertedSector(sector);

    if (uniqueSegment) {
      continue;
    }

    sectorRepository.insertOne({
      name: sector,
      slug: slug(sector),
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    });
  }

  await connection.close();
}
