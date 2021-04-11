import express from "express";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { DocumentNode, getOperationAST } from "graphql";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { SpaceXAPI } from "./dataSource/spaceX";
import { schemaDirectives } from "./directives";
import { plugins } from "./plugins";
import onHealthCheck from "./utils/healthCheck";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import { getDataLoader } from "./dataLoader";
// import cors from "./middleware/cors";
import { PLAY_GROUND_SETTINGS } from "./utils/generics";
import redisCache from "./utils/redis";
import formatError from "./utils/formatError";
import { Logger, LOG_TYPE } from "./utils/logger";

dotenv.config();

const app = express();
const logger = new Logger();

const port = process.env.PORT || "6688";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async ({ req, res }) => {
  //   console.log("REQN", req);
  //   res;
  // },
  dataSources: () => ({
    spaceXAPI: new SpaceXAPI(),
  }),
  schemaDirectives,
  context: {
    getDataLoader,
  },
  plugins: [...plugins],
  cacheControl: {
    defaultMaxAge: 10,
    stripFormattedExtensions: false,
    calculateHttpHeaders: false,
  },
  playground: {
    settings: PLAY_GROUND_SETTINGS,
  },
  // A value or function called with the parsed Document AST
  // creating the root value passed to the GraphQL executor.
  // rootValue?: ((parsedQuery: DocumentNode) => TRootValue) | TRootValue;
  rootValue: (documentAST: DocumentNode) => {
    const op = getOperationAST(documentAST);
    return {
      operation: op?.operation, // the same thing just to demo, e.g. operation: "query"
    };
  },
  formatError,
  // cache: redisCache,
});

const corsOptions = {
  origin: "http://localhost:5000",
  credentials: true,
};

app.set("port", port);
// app.use(express.json());
// app.use(cors());
app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.redirect(301, "/public/index.html");
});

app.post("/", (_req, res) => {
  res.redirect(308, "/graphql");
});

//This is just used for health checker for express
app.get("/health", (_req, res) => {
  res.send("Ok");
});

// or app.use(server.getMiddleware({}))
server.applyMiddleware({
  app,
  onHealthCheck,
  cors: corsOptions,
});
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`
  );
});
