import slug from "slug";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";
import type {
  StockWithId,
  SubSector,
} from "@pibernetwork/stocks-model/src/types";

export async function syncSubSectors() {
  const stockRepository = new StockRepository();

  const stocks: StockWithId[] = await stockRepository.queryAll({});

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
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    };

    subSectorsInDb.push(subSector);

    subSectorsModels.push(subSectorEntry);
    // console.log(subSectorEntry);
  }
  await sectorRepository.close();

  await subSectorRepository.insertMany(subSectorsModels);
  await subSectorRepository.close();
}
