import {
  ApolloServerPluginUsageReporting,
  ApolloServerPluginSchemaReporting,
} from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

/* Providing graph API key to Apollo Server by setting  APOLLO_KEY environment variable.
 * Both plugins below requires account in  studio.apollographql.com
 * Note it's not available under dev env:
 * https://www.apollographql.com/docs/studio/setup-analytics/#pushing-traces-from-apollo-server
 */

export const SchemaReportPlugin = ():
  | ApolloServerPlugin
  | Record<string, never> =>
  process.env.APOLLO_KEY ? ApolloServerPluginSchemaReporting() : {};

export const UsageReportPlugin = ():
  | ApolloServerPlugin
  | Record<string, never> =>
  process.env.APOLLO_KEY
    ? ApolloServerPluginUsageReporting({
        sendHeaders: { all: true },
      })
    : {};
