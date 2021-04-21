import gql from "graphql-tag";
const typeDefs = gql`
  scalar Date

  type Edge {
    cursor: String
    node: Capsule
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type CapsulesResponse {
    edges: [Edge]
    pageInfo: PageInfo
  }

  type Query {
    capsules(first: Int, after: String): CapsulesResponse
    capsule(id: ID!): Capsule
  }

  type Capsule @cacheControl(maxAge: 6000) @uniqueID {
    id: ID
    landings: Int
    missions: [CapsuleMission]
    original_launch: Date @date(format: "HH:MM")
    reuse_count: Int
    status: String
    type: String
  }
  input CapsulesFind {
    id: ID
    landings: Int
    mission: String
    original_launch: Date
    reuse_count: Int
    status: String
    type: String
  }
  type CapsuleMission {
    flight: Int
    name: String
  }
`;

export default typeDefs;
