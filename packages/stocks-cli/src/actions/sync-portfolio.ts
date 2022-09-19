import type { Portfolio } from "@pibernetwork/stocks-model/src/types";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";
import { PortfolioRepository } from "@pibernetwork/stocks-model/src/repository/portfolio";
import dotenv from "dotenv";
dotenv.config();

type Share = Pick<Portfolio, "current" | "objective" | "averagePrice"> & {
  ticket: string;
};

const portfolioRepository = new PortfolioRepository(
  process.env.DATABASE_CONNECTION
);

const ticketRepository = new TicketRepository(process.env.DATABASE_CONNECTION);

export async function syncPortfolio() {
  await portfolioRepository.deleteMany();
  const shares: Share[] = [
    { ticket: "BBAS3", current: 18, objective: 450, averagePrice: 39.31 },
    { ticket: "BBSE3", current: 34, objective: 425, averagePrice: 29.14 },
    { ticket: "BMGB4", current: 99, objective: 6720, averagePrice: 2.77 },
    { ticket: "BRAP3", current: 20, objective: 310, averagePrice: 20.83 },
    { ticket: "CEBR3", current: 62, objective: 220, averagePrice: 13.17 },
    { ticket: "CPFE3", current: 15, objective: 530, averagePrice: 33.85 },
    { ticket: "GOAU3", current: 50, objective: 1400, averagePrice: 9.58 },
    { ticket: "ITUB3", current: 25, objective: 700, averagePrice: 21.23 },
    { ticket: "KLBN3", current: 198, objective: 7225, averagePrice: 3.94 },
    { ticket: "PETR3", current: 26, objective: 250, averagePrice: 36.13 },
    { ticket: "SYNE3", current: 50, objective: 430, averagePrice: 4.58 },
    { ticket: "VALE3", current: 17, objective: 180, averagePrice: 65.73 },
    { ticket: "PSSA3", current: 0, objective: 400, averagePrice: 0 },
  ];

  for (const { current, objective, averagePrice, ticket } of shares) {
    const ticketWithId = await ticketRepository.queryOne({
      name: ticket,
    });

    if (!ticketWithId) {
      throw new Error("Missing portfolio ticket");
    }

    const { income, currentPrice } = ticketWithId;
    const { range } = income;
    const { averageAmount } = range;

    const currentInvestment = current * averagePrice;
    const objectiveMissing = objective - current;

    const liquidationAmount = current * currentPrice;
    const liquidationRate =
      (currentInvestment > 0 &&
        (liquidationAmount * 100) / currentInvestment - 100) ||
      0;
    const investmentAmount = objectiveMissing * currentPrice;
    const objectiveDividends = objective * averageAmount;
    const currentDividends = current * averageAmount;

    const portfolio: Portfolio = {
      ticketId: ticketWithId._id,
      current,
      objective,
      averagePrice,
      liquidationAmount,
      liquidationRate,
      investmentAmount,
      objectiveDividends,
      currentDividends,
    };

    await portfolioRepository.insertOne(portfolio);
  }

  await ticketRepository.close();
}
