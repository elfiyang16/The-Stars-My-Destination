import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    dragons(limit: Int, offset: Int): [Dragon]
    dragon(id: ID!): Dragon
  }
  extend type Capsule {
    dragon: Dragon
  }
  # This type uses both the Dragons's name and the id field,
  type Dragon @uniqueID(from: ["name", "id"]) {
    active: Boolean
    # TODO: resolve issue https://github.com/ardatan/graphql-tools/issues/842
    crew_capacity: Int #@greater(limit: -1)
    description: String
    diameter: Distance
    dry_mass_kg: Int
    dry_mass_lb: Int
    first_flight: String
    height_w_trunk: Distance
    id: ID
    launch_payload_mass: Mass
    launch_payload_vol: Volume
    name: String @upperCase
    orbit_duration_yr: Int
    return_payload_mass: Mass
    return_payload_vol: Volume
    sidewall_angle_deg: Float
    type: String
    wikipedia: String
  }
`;
export default typeDefs;
