import capsuleDefs from "./capsule/typeDefs";
import missionDefs from "./capsule/typeDefs";
import directiveDefs from "./directives/typeDefs";
import { mergeTypeDefs } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([
  capsuleDefs,
  missionDefs,
  directiveDefs,
]);
