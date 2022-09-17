import { TicketRepository } from "@pibernetwork/stocks-model/src/repository/tickets";

import { CompanyRepository } from "@pibernetwork/stocks-model/src/repository/company";
import { SegmentRepository } from "@pibernetwork/stocks-model/src/repository/segment";
import { SubSectorRepository } from "@pibernetwork/stocks-model/src/repository/sub-sector";
import { SectorRepository } from "@pibernetwork/stocks-model/src/repository/sector";
import { SourceRepository } from "@pibernetwork/stocks-model/src/repository/source";

export async function dropDatabase(dropStocks = false) {
  if (dropStocks) {
    const stockRepository = new SourceRepository(
      process.env.DATABASE_CONNECTION
    );
    await stockRepository.deleteMany();
  }
  const sectorRepository = new SectorRepository(
    process.env.DATABASE_CONNECTION
  );
  await sectorRepository.deleteMany();

  const subSectorRepository = new SubSectorRepository(
    process.env.DATABASE_CONNECTION
  );
  await subSectorRepository.deleteMany();

  const segmentRepository = new SegmentRepository(
    process.env.DATABASE_CONNECTION
  );

  await segmentRepository.deleteMany();

  const companyRepository = new CompanyRepository(
    process.env.DATABASE_CONNECTION
  );
  await companyRepository.deleteMany();

  const ticketRepository = new TicketRepository(
    process.env.DATABASE_CONNECTION
  );
  await ticketRepository.deleteMany();

  await ticketRepository.close();
}
