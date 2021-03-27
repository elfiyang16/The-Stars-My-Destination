import { GraphQLSchema, separateOperations } from "graphql";
import { PluginDefinition } from "apollo-server-core";
import {
  GraphQLRequestContext,
  ApolloServerPlugin,
  GraphQLServiceContext,
  GraphQLServerListener,
} from "apollo-server-plugin-base";
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from "graphql-query-complexity";
import { ValueOrPromise } from "apollo-server-types";

const MAX_ALLOWED_COMPLEXITY = 100;

// VERY ANNOYING, SOMEHOW USE CLASS WILL SKIP THE serviceWillStart function

// export default class ComplexityPlugin implements ApolloServerPlugin {
//   private schema: GraphQLSchema;
//   //parameter properties
//   constructor(private maxAllowedComplexity: number = MAX_ALLOWED_COMPLEXITY) {}

//   // below return either void or an GraphQLServerListener object that contains cb for serverWillStop
//   public serviceWillStart(
//     service: GraphQLServiceContext
//   ): ValueOrPromise<GraphQLServerListener | void> {
//     console.log("service", service);
//     // this.schema = service.schema;
//   }
//
//   public requestDidStart(requestContext) {
//     return {
//       didResolveOperation: ({ request, document, schema }) => {
//         const complexity = getComplexity({
//           schema: schema,
//           query: request.operationName
//             ? separateOperations(document)[request.operationName]
//             : document,
//           variables: request.variables,
//           estimators: [
//             fieldExtensionsEstimator(),
//             simpleEstimator({ defaultComplexity: 1 }),
//           ],
//         });
//         console.log("complexity", complexity);
//         if (complexity > this.maxAllowedComplexity) {
//           throw new Error(
//             `Sorry, too complicated query (complexity: ${complexity}, max complexity: ${this.maxAllowedComplexity})`
//           );
//         }
//         console.log("ComplexityPlugin run\n");
//       },
//     };
//   }
// }

const ComplexityPlugin: ApolloServerPlugin = {
  requestDidStart(requestContext) {
    return {
      didResolveOperation: ({ request, document, schema }) => {
        const complexity = getComplexity({
          schema: schema,
          query: request.operationName
            ? separateOperations(document)[request.operationName]
            : document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity > this.maxAllowedComplexity) {
          throw new Error(
            `Sorry, too complicated query (complexity: ${complexity}, max complexity: ${this.maxAllowedComplexity})`
          );
        }
      },
    };
  },
};

export default ComplexityPlugin;
