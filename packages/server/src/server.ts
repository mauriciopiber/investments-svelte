import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express, { Express } from "express";
import cors from "cors";
import Tickets from "./services/tickets";

import path from "path";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const resolversFiles = loadFilesSync(path.join(__dirname, "./resolvers"));
const resolvers = mergeResolvers(resolversFiles);

const typesFiles = loadFilesSync(path.join(__dirname, "./typeDefs"));
const typeDefs = mergeTypeDefs(typesFiles);

import { connection } from "@pibernetwork/model/src/containers/root";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(301).redirect("/graphql");
});

const httpServer = http.createServer(app);

const startApolloServer = async (app: Express, httpServer: http.Server) => {
  await connection.init();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => ({
      tickets: new Tickets(),
      // OR
      // users: new Users(UserModel)
    }),
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
