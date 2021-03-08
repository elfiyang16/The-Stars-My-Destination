import DataLoader from "dataloader";
import { Dragon } from "../dataSource/interfaces";
import { GraphQLError } from "graphql";
import { find } from "lodash";

// this will be a bit weird due to the nature of rest does not support batch

// dataloader will return error instead of stop execution and bubbling up
function checkError<T>(value: T | undefined): T {
  if (typeof value === "undefined") {
    throw new GraphQLError("API returns error");
  }
  return value;
}

const batchLoaderFn = async (
  keys: string[],
  dataSources
): Promise<Dragon[]> => {
  // return a list of dragons object Promise
  const results = await Promise.all(
    keys.map((id) => {
      return dataSources.spaceXAPI.getDragonById(id);
    })
  );
  //make sure the order and number is right, and wrap in a promise
  return Promise.resolve(
    keys.map((key: string) => {
      return checkError(find(results, (result) => key === result.id));
      // return find(results, (result) => key === result.id) || null;
    })
  );
};

export const getDataLoader = (dataSources) => {
  return new DataLoader(
    (keys: string[]) => batchLoaderFn(keys, dataSources),
    {}
  );
};
