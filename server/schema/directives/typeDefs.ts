import gql from "graphql-tag";

const typeDefs = gql`
  directive @date(format: String) on FIELD_DEFINITION

  directive @upperCase on FIELD_DEFINITION

  directive @greater(limit: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
`;

export default typeDefs;
