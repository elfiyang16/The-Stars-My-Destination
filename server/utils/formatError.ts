import { ApolloError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { Logger, LOG_TYPE } from "./logger";

/*
 * Can also just do this in the plugin.
 */
const logger = new Logger();
const formatError = (err: GraphQLError): ApolloError | GraphQLError => {
  if (process.env.NODE_ENV !== "production") {
    logger.log(LOG_TYPE.ERROR, err.extensions?.code, err);
    return err;
  }
  return err;
};

export default formatError;
