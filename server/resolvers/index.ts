export const resolvers = {
  Query: {
    capsules: async (_, args, { dataSources }): Promise<any> => {
      const capsules = await dataSources.spaceXAPI.getCapsules();
      return capsules;
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
};
