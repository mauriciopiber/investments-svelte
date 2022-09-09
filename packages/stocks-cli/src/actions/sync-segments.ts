import slug from "slug";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type {
  Segment,
  StockWithId,
} from "@pibernetwork/stocks-model/src/types";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";

export async function syncSegments() {
  const stockRepository = new StockRepository();

  const stocks: StockWithId[] = await stockRepository.queryAll({});

  const segmentsFromStocks = stocks.map((stock) => ({
    sector: stock.sector,
    subSector: stock.subSector,
    segment: stock.segment,
  }));

  const segmentRepository = new SegmentRepository();
  const subSectorRepository = new SubSectorRepository();
  const sectorRepository = new SectorRepository();

  const segmentsInDb: string[] = [];
  const segmentsModels: Segment[] = [];

  for (const { sector, subSector, segment } of segmentsFromStocks) {
    if (segmentsInDb.includes(segment)) {
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

    if (!sectorModel._id.equals(subSectorModel.sectorId)) {
      throw new Error(
        `Sector ${JSON.stringify(sectorModel)} and Sub Sector ${JSON.stringify(
          subSector
        )} do not match`
      );
    }

    segmentsInDb.push(segment);

    segmentsModels.push({
      name: segment,
      slug: slug(segment),
      subSectorId: subSectorModel._id,
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    });
  }

  // const uniqueSegments = [...new Set(stocks.map((item) => item.segment))];

  // const segments = uniqueSegments.map((segment) => {
  //   return {
  //     name: segment,
  //     slug: slug(segment),
  //   };
  // });

  // console.log(segments);
  await segmentRepository.insertMany(segmentsModels);

  await segmentRepository.close();
  await subSectorRepository.close();
  await sectorRepository.close();
  // console.log("Done");
}
