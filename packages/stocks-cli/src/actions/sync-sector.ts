import slug from "slug";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";
import type { StockWithId } from "@pibernetwork/stocks-model/src/types";

export async function syncSectors() {
  const stockRepository = new StockRepository();

  const stocks: StockWithId[] = await stockRepository.queryAll({});

  const uniqueSector = [...new Set(stocks.map((item) => item.sector))];

  const sectors = uniqueSector.map((sector) => {
    return {
      name: sector,
      slug: slug(sector),
      income: {
        averageAmount: 0,
        averageYield: 0,
      },
    };
  });

  const companyRepository = new SectorRepository();

  await companyRepository.insertMany(sectors);

  await companyRepository.close();
  await stockRepository.close();
  console.log("Done");
}
