import slug from "slug";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { SourceRepository } from "@pibernetwork/stocks-model/src/repository/source";
import dotenv from "dotenv";
dotenv.config();
import type { StockSourceWithId } from "@pibernetwork/stocks-model/src/types";

const stockRepository = new SourceRepository(process.env.DATABASE_CONNECTION);
const sectorRepository = new SectorRepository(process.env.DATABASE_CONNECTION);
const subSectorRepository = new SubSectorRepository(
  process.env.DATABASE_CONNECTION
);

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
  const stocks: StockSourceWithId[] = await stockRepository.queryAll({});

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
  await sectorRepository.close();

  await subSectorRepository.close();
}
