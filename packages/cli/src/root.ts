import type {
  Segment,
  Connection,
  Repository,
  SubSector,
  Sector,
  Company,
  Ticket,
  StockSource,
  Portfolio,
} from "@pibernetwork/model/src/types";
import { createContainer } from "@pibernetwork/model/src/containers/inversify.config";
import { TYPES } from "@pibernetwork/model/src/containers/types";

import dotenv from "dotenv";
dotenv.config();

const container = createContainer(process.env.DATABASE_CONNECTION);

export const connection = container.get<Connection>(TYPES.Connection);

export const segmentRepository = container.get<Repository<Segment>>(
  TYPES.Segment.Repository
);

export const subSectorRepository = container.get<Repository<SubSector>>(
  TYPES.SubSector.Repository
);

export const sectorRepository = container.get<Repository<Sector>>(
  TYPES.Sector.Repository
);

export const companyRepository = container.get<Repository<Company>>(
  TYPES.Company.Repository
);

export const ticketRepository = container.get<Repository<Ticket>>(
  TYPES.Ticket.Repository
);

export const sourceRepository = container.get<Repository<StockSource>>(
  TYPES.StocksSource.Repository
);

export const portfolioRepository = container.get<Repository<Portfolio>>(
  TYPES.Portfolio.Repository
);
