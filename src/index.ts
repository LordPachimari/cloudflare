import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./schema";
import QueryResolver from "./resolvers/query";
import MutationResolver from "./resolvers/mutation";
import SubscriptionResolver from "./resolvers/subscription";
import { Resolvers } from "./generated/graphql";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dateScalar } from "./utils/customScalar";

export interface MyContext {
  request: Request;
  client: DynamoDBDocumentClient;

  BUCKET_NAME: string;
  TABLE_NAME: string;

  ACCESS_KEY: string;
  SECRET_ACCESS_KEY: string;
  REGION: string;
}
const resolvers: Resolvers = {
  Date: dateScalar,
  Query: QueryResolver,
  Mutation: MutationResolver,
  // Subscription: SubscriptionResolver,
};
export const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga<MyContext>({
  schema,
  context: (env: {
    BUCKET_NAME: string;
    USER_TABLE: string;
    QUEST_TABLE: string;
    ACCESS_KEY: string;
    SECRET_ACCESS_KEY: string;
    REGION: string;
  }) => {
    const client = new DynamoDBClient({
      region: env.REGION,
      credentials: {
        accessKeyId: env.ACCESS_KEY,
        secretAccessKey: env.SECRET_ACCESS_KEY,
      },
    });
    // const marshallOptions = {
    //   convertEmptyValues: true, // false, by default.
    // };
    // const translateConfig = { marshallOptions };
    const ddbDocClient = DynamoDBDocumentClient.from(client);
    return { client: ddbDocClient };
  },
});

// self.addEventListener("fetch", yoga);

export default { fetch: yoga.fetch };
