import { loadStocks } from "src/stocks/stocks";
import type { Stock } from "src/types";
import slug from "slug";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";

export async function syncCompanies() {
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

  const uniqueCompanies = [...new Set(stocks.map((item) => item.company))];

  const companies = uniqueCompanies.map((company) => {
    const firstCompanyStock = stocks.find((stock) => stock.company === company);

    if (!firstCompanyStock) {
      throw new Error();
    }

    const { segment, sector, subSector } = firstCompanyStock;

    return {
      name: company,
      slug: slug(company),
      segment,
      sector,
      subSector,
    };
  });

  const companyRepository = new CompanyRepository();

  await companyRepository.insertMany(companies);

  await companyRepository.close();
  console.log("Done");
}
