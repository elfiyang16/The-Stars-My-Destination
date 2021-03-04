import capsuleDefs from "./capsule/typeDefs";
import missionDefs from "./mission/typeDefs";
import directiveDefs from "./directives/typeDefs";
import globalDefs from "./globals/typeDefs";
import dragonDefs from "./dragon/typeDefs";
import { mergeTypeDefs } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([
  capsuleDefs,
  missionDefs,
  directiveDefs,
  globalDefs,
  dragonDefs,
]);
