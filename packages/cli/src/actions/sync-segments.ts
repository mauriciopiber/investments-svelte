import slug from "slug";

import type { StockSourceWithId } from "@pibernetwork/model/src/types";

import {
  connection,
  segmentRepository,
  sectorRepository,
  subSectorRepository,
  sourceRepository,
} from "@pibernetwork/model/src/containers/root";

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
  await connection.init();
  const stocks: StockSourceWithId[] = await sourceRepository.queryAll({});

  const segmentsFromStocks = stocks.map((stock) => ({
    sector: stock.sector,
    subSector: stock.subSector,
    segment: stock.segment,
  }));

  for (const { sector, subSector, segment } of segmentsFromStocks) {
    if (!sector || !subSector || !segment) {
      throw new Error();
    }
    const uniqueSegment = await isInsertedSegment(sector, subSector, segment);

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

  await connection.close();
}
