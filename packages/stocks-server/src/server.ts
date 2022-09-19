import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express, { Express } from "express";
import cors from "cors";
import resolvers from "./resolvers/stocks";
import typeDefs from "./typeDefs/stocks";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.status(301).redirect("/graphql");
});

const httpServer = http.createServer(app);

const startApolloServer = async (app: Express, httpServer: http.Server) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
