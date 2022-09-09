import slug from "slug";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";
import type { StockWithId } from "@pibernetwork/stocks-model/src/types";

const stockRepository = new StockRepository();
const sectorRepository = new SectorRepository();

async function isInsertedSector(sector: string): Promise<boolean> {
  const sectorDb = await sectorRepository.queryOne({
    name: { $eq: sector },
  });

  return sectorDb !== null ? true : false;
}

export async function syncSectors() {
  const stocks: StockWithId[] = await stockRepository.queryAll({});

  for (const { sector } of stocks) {
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

  await sectorRepository.close();
  await stockRepository.close();
}
