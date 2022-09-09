import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";

import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import type {
  PartialIncome,
  TicketWithId,
} from "@pibernetwork/stocks-model/src/types";

export async function syncIncome() {
  const segmentRepository = new SegmentRepository();
  const subSectorRepository = new SubSectorRepository();
  const sectorRepository = new SectorRepository();
  const companyRepository = new CompanyRepository();
  const ticketRepository = new TicketRepository();

  const sectors = await sectorRepository.queryAll({});

  for (const sector of sectors) {
    const sectorPartialIncome: PartialIncome[] = [];
    const subSectors = await subSectorRepository.queryAll({
      sectorId: { $eq: sector._id },
    });

    for (const subSector of subSectors) {
      const subSectorPartialIncomes: PartialIncome[] = [];

      const segments = await segmentRepository.queryAll({
        subSectorId: { $eq: subSector._id },
      });

      for (const segment of segments) {
        const segmentPartialIncomes: PartialIncome[] = [];
        const companies = await companyRepository.queryAll({
          segmentId: { $eq: segment._id },
        });

        for (const company of companies) {
          const tickets = await ticketRepository.queryAll({
            companyId: { $eq: company._id },
          });

          const incomeCompany = calculateIncomeFromTickets(tickets);
          segmentPartialIncomes.push(incomeCompany);

          await companyRepository.updateOne(company._id, {
            income: incomeCompany,
          });
        }

        const incomeSegment = calculateIncome(segmentPartialIncomes);

        await segmentRepository.updateOne(segment._id, {
          income: incomeSegment,
        });

        subSectorPartialIncomes.push(incomeSegment);
      }

      const incomeSubSector = calculateIncome(subSectorPartialIncomes);

      await subSectorRepository.updateOne(subSector._id, {
        income: incomeSubSector,
      });

      sectorPartialIncome.push(incomeSubSector);
    }

    const incomeSector = calculateIncome(sectorPartialIncome);

    await sectorRepository.updateOne(sector._id, {
      income: incomeSector,
    });
  }

  await companyRepository.close();

  await segmentRepository.close();
  await subSectorRepository.close();
  await sectorRepository.close();
  await ticketRepository.close();
}

function calculateIncome(incomes: PartialIncome[]): PartialIncome {
  const totalIncomes = incomes.length || 0;

  const totalYield = incomes.reduce(
    (amount, income) => amount + income.averageYield,
    0
  );

  const totalAmount = incomes.reduce(
    (amount, income) => amount + income.averageAmount,
    0
  );
  const averageYield = (totalIncomes && totalYield / totalIncomes) || 0;
  const averageAmount = (totalIncomes && totalAmount / totalIncomes) || 0;

  if (isNaN(averageYield) || !Number.isFinite(averageYield)) {
    throw new Error(
      `Average yield is not a number -> ${averageYield} -> ${JSON.stringify(
        incomes
      )}`
    );
  }

  if (isNaN(averageAmount) || !Number.isFinite(averageAmount)) {
    throw new Error(
      `Average yield is not a number -> ${averageYield} -> ${JSON.stringify(
        incomes
      )}`
    );
  }

  return { averageYield, averageAmount };
}

function calculateIncomeFromTickets(tickets: TicketWithId[]): PartialIncome {
  const ticketsCount = tickets.length;

  const ticketsYield = tickets.reduce(
    (amount, ticket) => amount + ticket.income.range.averageYield,
    0
  );

  const ticketsAmount = tickets.reduce(
    (amount, ticket) => amount + ticket.income.range.averageIncome,
    0
  );

  const averageYield = ticketsYield / ticketsCount;
  const averageAmount = ticketsAmount / ticketsCount;

  if (isNaN(averageYield) || !Number.isFinite(averageYield)) {
    throw new Error(
      `Average yield is not a number -> ${averageYield} -> ${JSON.stringify(
        tickets
      )}`
    );
  }

  if (isNaN(averageAmount) || !Number.isFinite(averageAmount)) {
    throw new Error(
      `Average yield is not a number -> ${averageYield} -> ${JSON.stringify(
        tickets
      )}`
    );
  }

  return { averageYield, averageAmount };
}
