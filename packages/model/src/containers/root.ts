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
  RepositoryWithFilter,
  Profile,
  Service,
} from "../types";
import { createContainer } from "./inversify.config";
import { TYPES } from "./types";

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

export const ticketService = container.get<Service<Ticket>>(
  TYPES.Ticket.Service
);

export const ticketRepository = container.get<RepositoryWithFilter<Ticket>>(
  TYPES.Ticket.Repository
);

export const sourceRepository = container.get<Repository<StockSource>>(
  TYPES.StocksSource.Repository
);

export const portfolioRepository = container.get<Repository<Portfolio>>(
  TYPES.Portfolio.Repository
);

export const profileRepository = container.get<Repository<Profile>>(
  TYPES.Profile.Repository
);
