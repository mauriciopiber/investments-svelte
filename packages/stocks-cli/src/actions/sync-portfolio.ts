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
  const shares: Share[] = [
    { ticket: "BBAS3", current: 18, objective: 450, averagePrice: 38.95 },
    { ticket: "BBSE3", current: 34, objective: 425, averagePrice: 29.14 },
    { ticket: "BMGB4", current: 99, objective: 6720, averagePrice: 2.77 },
    { ticket: "BRAP3", current: 20, objective: 310, averagePrice: 20.83 },
    { ticket: "CEBR3", current: 62, objective: 220, averagePrice: 13.17 },
    { ticket: "CPFE3", current: 15, objective: 530, averagePrice: 33.85 },
    { ticket: "GOAU3", current: 50, objective: 1400, averagePrice: 9.58 },
    { ticket: "ITUB3", current: 25, objective: 700, averagePrice: 21.23 },
    { ticket: "KLBN3", current: 198, objective: 7225, averagePrice: 3.94 },
    { ticket: "PETR3", current: 26, objective: 250, averagePrice: 36.13 },
    { ticket: "SYNE3", current: 50, objective: 430, averagePrice: 1.97 },
    { ticket: "VALE3", current: 17, objective: 180, averagePrice: 65.73 },
  ];

  for (const { current, objective, averagePrice, ticket } of shares) {
    const ticketWithId = await ticketRepository.queryOne({
      name: ticket,
    });

    if (!ticketWithId) {
      throw new Error("Missing portfolio ticket");
    }

    const portfolio: Portfolio = {
      ticketId: ticketWithId._id,
      current,

      objective,
      averagePrice,
    };

    await portfolioRepository.insertOne(portfolio);
  }

  await ticketRepository.close();
}
