/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextDidEncounterErrors,
  GraphQLRequestContextDidResolveOperation,
  GraphQLRequestContextDidResolveSource,
  GraphQLRequestContextExecutionDidStart,
  GraphQLRequestContextParsingDidStart,
  GraphQLRequestContextResponseForOperation,
  GraphQLRequestContextValidationDidStart,
  GraphQLRequestContextWillSendResponse,
  GraphQLServiceContext,
} from "apollo-server-plugin-base";

type BaseContext = Record<string, any>;

/* TODO: replace BaseContext with own Context */
const templatePlugin: ApolloServerPlugin<BaseContext> = {
  async serverWillStart(serviceContext: GraphQLServiceContext) {
    return {
      serverWillStop: async () => {},
    };
  },

  requestDidStart(requestContext: GraphQLRequestContext<BaseContext>) {
    return {
      didResolveSource: async (
        requsetContext: GraphQLRequestContextDidResolveSource<BaseContext>
      ) => {},
      parsingDidStart: (
        requsetContext: GraphQLRequestContextParsingDidStart<BaseContext>
      ) => {},
      validationDidStart: (
        requsetContext: GraphQLRequestContextValidationDidStart<BaseContext>
      ) => {},
      didResolveOperation: async (
        requsetContext: GraphQLRequestContextDidResolveOperation<BaseContext>
      ) => {},
      didEncounterErrors: async (
        requsetContext: GraphQLRequestContextDidEncounterErrors<BaseContext>
      ) => {},
      responseForOperation: async (
        requsetContext: GraphQLRequestContextResponseForOperation<BaseContext>
      ) => null,
      executionDidStart: (
        requsetContext: GraphQLRequestContextExecutionDidStart<BaseContext>
      ) => {},
      willSendResponse: async (
        requsetContext: GraphQLRequestContextWillSendResponse<BaseContext>
      ) => {},
    };
  },
};

export default templatePlugin;
