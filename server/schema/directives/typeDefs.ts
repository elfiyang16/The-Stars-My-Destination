import gql from "graphql-tag";

const typeDefs = gql`
  directive @date(format: String) on FIELD_DEFINITION
`;

export default typeDefs;
