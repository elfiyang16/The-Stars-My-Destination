import { CacheScope } from "apollo-cache-control";
import { GraphQLResolveInfo } from "graphql";

const CACHE_TTL = 60 * 60 * 1000;
const CACHE_SCOPE = CacheScope.Public;

// create function for dynamic resolver level cache control
export const createCacheControl = (
  info: GraphQLResolveInfo,
  maxAge: number = CACHE_TTL,
  scope: CacheScope = CACHE_SCOPE
): void => {
  const { cacheControl } = info;
  cacheControl.setCacheHint({ maxAge: maxAge, scope: scope });
};
