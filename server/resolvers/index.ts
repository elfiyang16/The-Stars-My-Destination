import { UserInputError } from "apollo-server-errors";
import { argsToArgsConfig } from "graphql/type/definition";
import { find } from "lodash";
import { Capsule } from "../dataSource/interfaces";

const encodeCursor = (id) => {
  return Buffer.from(id.toString()).toString("base64");
};

const decodeCursor = (encodedCursor) => {
  return Buffer.from(encodedCursor, "base64").toString("ascii");
};

export const resolvers = {
  Query: {
    // Relay style pagination
    capsules: async (
      _,
      { first, after }: { first: number; after: string },
      { dataSources }
    ): Promise<any> => {
      const MIN_LIMIT = 1;
      const MAX_LIMIT = 8;
      let firstInit = 5;
      let afterInit = 0;

      const capsules: Capsule[] = await dataSources.spaceXAPI.getCapsules();

      // decide the limit
      if (first !== undefined) {
        if (first < MIN_LIMIT || first > MAX_LIMIT) {
          throw new UserInputError(
            `Invalid limit value (min: ${MIN_LIMIT}, max: ${MAX_LIMIT})`
          );
        }
        firstInit = first;
      }

      // decide the cursor
      if (after !== undefined) {
        const index = capsules.findIndex(
          (capsule) => capsule.id === decodeCursor(after)
        );
        if (index === -1) {
          throw new UserInputError(`Invalid after value: cursor not found.`);
        }
        afterInit = index + 1;
        if (afterInit === capsules.length) {
          throw new UserInputError(`
            Invalid after value: no items after provided cursor.
          `);
        }
      }

      const returnCapsules = capsules.slice(afterInit, afterInit + firstInit);
      const lastCapsule = returnCapsules[returnCapsules.length - 1];

      return {
        pageInfo: {
          endCursor: encodeCursor(lastCapsule.id),
          hasNextPage: afterInit + firstInit < capsules.length,
        },
        edges: returnCapsules.map((capsule) => ({
          cursor: encodeCursor(capsule.id),
          node: capsule,
        })),
      };
    },
    capsule: async (
      _,
      { id }: { id: string },
      { dataSources }
    ): Promise<any> => {
      const capsule = await dataSources.spaceXAPI.getCapsuleById(id);
      return capsule;
    },
    missions: async (_, args, { dataSources }): Promise<any> => {
      const missions = await dataSources.spaceXAPI.getMissions({ ...args });
      return missions;
    },
    mission: async (
      _,
      { id }: { id: string },
      { dataSources }
    ): Promise<any> => {
      const mission = await dataSources.spaceXAPI.getMissionById(id);
      return mission;
    },
    dragons: async (_, args, { dataSources }): Promise<any> => {
      const dragons = await dataSources.spaceXAPI.getDragons({ ...args });
      return dragons;
    },
    dragon: async (
      _,
      { id }: { id: string },
      { dataSources }
    ): Promise<any> => {
      const dragon = await dataSources.spaceXAPI.getDragonById(id);
      return dragon;
    },
  },
  Capsule: {
    /* overwrite the default dragon field implementation since default rest only return id field of dragon */
    dragon: async (_, args, { dataSources, getDataLoader }): Promise<any> => {
      // const dragons = await dataSources.spaceXAPI.getDragons({ ...args });
      // const dragonInCapsule = find(
      //   dragons,
      //   (dragon) => dragon.id === _.dragon.id
      // );
      // return dragonInCapsule;

      const dragonLoader = getDataLoader(dataSources);
      return dragonLoader.load(_.dragon.id);
    },
  },
};
