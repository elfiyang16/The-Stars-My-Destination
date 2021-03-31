import formatError from "./formatError";
import { GraphQLError } from "graphql";

const createGraphqlError = (message: string, code: string): GraphQLError =>
  new GraphQLError(message, null, null, null, null, null, {
    code,
  });

describe("formatError", () => {
  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  it("Returns the GraphQL Error on development mode", () => {
    process.env.NODE_ENV = "development";

    const graphQLError = createGraphqlError("message", "VALIDATION_ERROR");
    expect(formatError(graphQLError)).toBeInstanceOf(GraphQLError);
  });

  it("Defaults to returning ApolloError", () => {
    process.env.NODE_ENV = "production";

    const graphQLError = createGraphqlError("message", "VALIDATION_ERROR");
    expect(graphQLError).toBeInstanceOf(GraphQLError);
  });
});
