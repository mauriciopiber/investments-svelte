import { loadStocks, loadStocksV2 } from "src/stocks/stocks";
import type { StockFilters, Stock, StockWithPageData } from "src/types";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import type { Ticket, Income } from "@pibernetwork/stocks-model/src/types";
import slug from "slug";
import { calculateDividendsV2 } from "src/stocks/dividends";

export async function syncTickets(filters: StockFilters, rangeInYears: number) {
  const stocks: StockWithPageData[] = await loadStocksV2(filters);

  const companyRepository = new CompanyRepository();
  const ticketRepository = new TicketRepository();

  const ticketModels: Ticket[] = [];

  for (const { stock, pageData } of stocks) {
    const companyModel = await companyRepository.queryOne({
      name: { $eq: stock.ticket.substring(0, 4) },
    });

    if (!companyModel) {
      throw new Error();
    }

    const income: Income = calculateDividendsV2(
      pageData.dividendsList,
      pageData.price,
      rangeInYears
    );

    ticketModels.push({
      name: stock.ticket,
      companyId: companyModel._id,
      slug: slug(stock.ticket),
      price: pageData.price,
      income,
    });
  }

  await ticketRepository.insertMany(ticketModels);

  await ticketRepository.close();
  await companyRepository.close();

  console.log("Done");
}
