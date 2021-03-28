import type { ApolloServerPlugin } from "apollo-server-plugin-base";
import { Logger, LOG_TYPE } from "../utils/logger";
const logger = new Logger();

const ErrorHandlerPlugin: ApolloServerPlugin = {
  requestDidStart({ queryHash, operationName }) {
    return {
      didEncounterErrors: ({ errors }) =>
        errors.forEach((error) => {
          logger.log(LOG_TYPE.ERROR, "Error encountered", {
            queryHash,
            operationName,
            error,
          });
        }),
    };
  },
};

export default ErrorHandlerPlugin;
