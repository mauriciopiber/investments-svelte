import { loadStocks } from "src/stocks/stocks";
import type { StockFilters, Stock } from "src/types";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import type { Ticket } from "@pibernetwork/stocks-model/src/types";
import slug from "slug";

export async function syncTickets(filters: StockFilters, rangeInYears: number) {
  const stocks: Stock[] = await loadStocks(filters, rangeInYears);

  const companyRepository = new CompanyRepository();
  const ticketRepository = new TicketRepository();

  const companiesModels: Ticket[] = [];

  for (const stock of stocks) {
    const companyModel = await companyRepository.queryOne({
      name: { $eq: stock.company },
    });

    if (!companyModel) {
      throw new Error();
    }

    companiesModels.push({
      name: stock.ticket,
      companyId: companyModel._id,
      slug: slug(stock.ticket),
    });
  }

  await ticketRepository.insertMany(companiesModels);

  await ticketRepository.close();
  await companyRepository.close();

  console.log("Done");
}
