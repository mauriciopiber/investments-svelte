import slug from "slug";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type { StockWithId } from "@pibernetwork/stocks-model/src/types";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";

const segmentRepository = new SegmentRepository(
  process.env.DATABASE_CONNECTION
);
const subSectorRepository = new SubSectorRepository(
  process.env.DATABASE_CONNECTION
);
const sectorRepository = new SectorRepository(process.env.DATABASE_CONNECTION);

async function isInsertedSegment(
  sector: string,
  subSector: string,
  segment: string
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

  if (!subSectorDb) {
    throw new Error("Sub Sector is required but not found");
  }

  const segmentDb = await segmentRepository.queryOne({
    name: { $eq: segment },
    subSectorId: { $eq: subSectorDb._id },
  });

  return segmentDb !== null ? true : false;
}

export async function syncSegments() {
  const stockRepository = new StockRepository(process.env.DATABASE_CONNECTION);

  const stocks: StockWithId[] = await stockRepository.queryAll({});

  const segmentsFromStocks = stocks.map((stock) => ({
    sector: stock.sector,
    subSector: stock.subSector,
    segment: stock.segment,
  }));

  for (const { sector, subSector, segment } of segmentsFromStocks) {
    const uniqueSegment = await isInsertedSegment(sector, subSector, segment);

    console.log(uniqueSegment);
    if (uniqueSegment) {
      continue;
    }
    const sectorModel = await sectorRepository.queryOne({
      name: { $eq: sector },
    });

    if (!sectorModel) {
      throw new Error();
    }

    const subSectorModel = await subSectorRepository.queryOne({
      sectorId: sectorModel._id,
      name: subSector,
    });

    if (!subSectorModel) {
      throw new Error();
    }

    await segmentRepository.insertOne({
      name: segment,
      slug: slug(segment),
      subSectorId: subSectorModel._id,
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    });
  }

  await segmentRepository.close();
  await subSectorRepository.close();
  await sectorRepository.close();
  // console.log("Done");
}
