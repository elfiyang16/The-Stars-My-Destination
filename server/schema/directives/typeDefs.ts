import gql from "graphql-tag";

const typeDefs = gql`
  scalar GreaterThan

  directive @date(format: String) on FIELD_DEFINITION

  directive @upperCase on FIELD_DEFINITION

  directive @greater(limit: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  directive @uniqueID(
    # The name of the new ID field, "uid" by DEFAULT
    name: String = "uid"
    # Which fields to include in the new ID:
    from: [String] = ["id"]
  ) on OBJECT
`;

export default typeDefs;
