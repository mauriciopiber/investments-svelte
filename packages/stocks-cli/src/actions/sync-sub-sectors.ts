import { loadStocks } from "src/stocks/stocks";
import type { Stock, StockFilters } from "src/types";
import slug from "slug";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type { SubSector } from "@pibernetwork/stocks-model/src/types";

export async function syncSubSectors(
  filters: StockFilters,
  rangeInYears: number
) {
  const stocks: Stock[] = await loadStocks(filters, rangeInYears);

  const subSectors = stocks.map((stock) => ({
    sector: stock.sector,
    subSector: stock.subSector,
  }));

  const sectorRepository = new SectorRepository();
  const subSectorRepository = new SubSectorRepository();

  const subSectorsInDb: string[] = [];

  const subSectorsModels: SubSector[] = [];
  for (const { sector, subSector } of subSectors) {
    if (subSectorsInDb.includes(subSector)) {
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
    };

    subSectorsInDb.push(subSector);

    subSectorsModels.push(subSectorEntry);
    // console.log(subSectorEntry);
  }
  await sectorRepository.close();

  await subSectorRepository.insertMany(subSectorsModels);
  await subSectorRepository.close();
}
