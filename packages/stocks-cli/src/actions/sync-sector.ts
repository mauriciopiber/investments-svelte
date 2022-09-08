import { loadStocks } from "src/stocks/stocks";
import type { Stock } from "src/types";
import slug from "slug";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";

export async function syncSectors() {
  const stocks: Stock[] = await loadStocks(
    [
      {
        type: "min",
        indicator: "marketValue",
        value: 200 * 1000000000,
      },
    ],
    5
  );

  const uniqueSector = [...new Set(stocks.map((item) => item.sector))];

  const sectors = uniqueSector.map((sector) => {
    return {
      name: sector,
      slug: slug(sector),
    };
  });

  const companyRepository = new SectorRepository();

  await companyRepository.insertMany(sectors);

  await companyRepository.close();
  console.log("Done");
}
