import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import MongoDbConnection from "../utils/mongoDbConnection";
import type {
  Company,
  Connection,
  Portfolio,
  Repository,
  RepositoryWithFilter,
  Sector,
  Segment,
  StockSource,
  SubSector,
  Ticket,
} from "../types";
import { SegmentRepository } from "../repository/segment";
import { CompanyRepository } from "../repository/company";
import { TicketRepository } from "../repository/tickets";
import { SourceRepository } from "../repository/source";
import { SubSectorRepository } from "../repository/sub-sector";
import { SectorRepository } from "../repository/sector";
import { PortfolioRepository } from "../repository/portfolio";

function createContainer(connectionUrl: string | null | undefined) {
  if (!connectionUrl) {
    throw new Error("Missing connection URL");
  }

  const container = new Container();
  container
    .bind<Connection>(TYPES.Connection)
    .toDynamicValue(() => new MongoDbConnection(connectionUrl))
    .inSingletonScope();

  container
    .bind<Repository<Sector>>(TYPES.Sector.Repository)
    .to(SectorRepository);

  container
    .bind<Repository<SubSector>>(TYPES.SubSector.Repository)
    .to(SubSectorRepository);

  container
    .bind<Repository<Segment>>(TYPES.Segment.Repository)
    .to(SegmentRepository);

  container
    .bind<Repository<Company>>(TYPES.Company.Repository)
    .to(CompanyRepository);

  container
    .bind<RepositoryWithFilter<Ticket>>(TYPES.Ticket.Repository)
    .to(TicketRepository);

  container
    .bind<Repository<Portfolio>>(TYPES.Portfolio.Repository)
    .to(PortfolioRepository);

  container
    .bind<Repository<StockSource>>(TYPES.StocksSource.Repository)
    .to(SourceRepository);

  return container;
}

export { createContainer };
