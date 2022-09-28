// file inversify.config.ts
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import MongoDbConnection, { Connection } from "../utils/mongoDbConnectionV2";
import type { MongoRepository } from "../abstracts/repository";
import type { Segment } from "../types";
import { SegmentRepository } from "src/repository/segment";

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
    .bind<MongoRepository<Segment>>(TYPES.SegmentRepository)
    .to(SegmentRepository);

  return container;
}

export { createContainer };
