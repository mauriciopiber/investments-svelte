import slug from "slug";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { SourceRepository } from "@pibernetwork/stocks-model/src/repository/source";
import type { StockSourceWithId } from "@pibernetwork/stocks-model/src/types";
import dotenv from "dotenv";
dotenv.config();

const stockRepository = new SourceRepository(process.env.DATABASE_CONNECTION);
const sectorRepository = new SectorRepository(process.env.DATABASE_CONNECTION);

async function isInsertedSector(sector: string): Promise<boolean> {
  const sectorDb = await sectorRepository.queryOne({
    name: { $eq: sector },
  });

  return sectorDb !== null ? true : false;
}

export async function syncSectors() {
  const stocks: StockSourceWithId[] = await stockRepository.queryAll({});

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

  await sectorRepository.close();
  await stockRepository.close();
}
