import type { StockFilters, StockWithPageData } from "src/types";
import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import { StockRepository } from "@pibernetwork/stocks-model/src/repository/stock";
import type {
  Ticket,
  Income,
  StockWithId,
} from "@pibernetwork/stocks-model/src/types";
import slug from "slug";
import { calculateDividendsV2 } from "src/stocks/dividends";

const stockRepository = new StockRepository(process.env.DATABASE_CONNECTION);
const companyRepository = new CompanyRepository(
  process.env.DATABASE_CONNECTION
);
const ticketRepository = new TicketRepository(process.env.DATABASE_CONNECTION);

export async function syncTickets(rangeInYears: number) {
  const stocks: StockWithId[] = await stockRepository.queryAll({});

  const ticketModels: Ticket[] = [];

  for (const stock of stocks) {
    const companyModel = await companyRepository.queryOne({
      name: { $eq: stock.name },
    });

    if (!companyModel) {
      throw new Error();
    }

    console.log(rangeInYears);

    const income: Income = calculateDividendsV2(
      stock.dividendsList,
      stock.price,
      rangeInYears
    );

    ticketModels.push({
      name: stock.ticket,
      companyId: companyModel._id,
      slug: slug(stock.ticket),
      price: stock.price,
      income,
    });
  }

  await ticketRepository.insertMany(ticketModels);

  await ticketRepository.close();
  await companyRepository.close();
}
