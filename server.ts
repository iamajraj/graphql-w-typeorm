import "reflect-metadata";

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { AppDataSouce } from "./config/db";

const main = async () => {
  await AppDataSouce.initialize();
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const server = new ApolloServer({
    schema,
  });

  await server.listen(8000);
};

main()
  .then(() => {
    console.log("Server started 🚀");
  })
  .catch((err) => {
    console.error(err);
  });
