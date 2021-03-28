import type { ApolloServerPlugin } from "apollo-server-plugin-base";
import { Logger, LOG_TYPE } from "../utils/logger";

const logger = new Logger();
export const LoggerPlugin: ApolloServerPlugin = {
  serverWillStart() {
    logger.log(LOG_TYPE.INFO, "Server is starting");
  },
  requestDidStart(requestContext) {
    const {
      request: { operationName, variables },
    } = requestContext;
    logger.log(LOG_TYPE.DATA, "Request start", {
      operationName: operationName,
      variables: variables ?? false,
    });

    return {
      willSendResponse: ({ errors }) => {
        logger.log(LOG_TYPE.DATA, "Request end", {
          errors: !!errors, //instead of print it we just need to know if error exist
        });
      },
    };
  },
};

export default LoggerPlugin;
