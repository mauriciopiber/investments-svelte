import {
  connection,
  segmentRepository,
  sectorRepository,
  subSectorRepository,
  companyRepository,
  ticketRepository,
  sourceRepository,
} from "@pibernetwork/model/src/containers/root";

export async function dropDatabase(dropStocks = false) {
  await connection.init();
  if (dropStocks) {
    await sourceRepository.deleteMany();
  }

  await sectorRepository.deleteMany();

  await subSectorRepository.deleteMany();

  await segmentRepository.deleteMany();

  await companyRepository.deleteMany();

  await ticketRepository.deleteMany();

  await connection.close();
}
