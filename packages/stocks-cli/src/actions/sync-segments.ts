import { loadStocks } from "src/stocks/stocks";
import type { Stock, StockFilters } from "src/types";
import slug from "slug";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type { Segment } from "@pibernetwork/stocks-model/src/types";

export async function syncSegments(
  filters: StockFilters,
  rangeInYears: number
) {
  const stocks: Stock[] = await loadStocks(filters, rangeInYears);

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
      throw new Error("Sector and Sub Sector do not match");
    }

    segmentsInDb.push(segment);

    segmentsModels.push({
      name: segment,
      slug: slug(segment),
      subSectorId: subSectorModel._id,
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
