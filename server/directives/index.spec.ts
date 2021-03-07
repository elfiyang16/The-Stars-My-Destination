import { SchemaDirectiveVisitor } from "apollo-server";
import { schemaDirectives } from "./";

describe(`directive exports`, () => {
  it(`each are instances of SchemaDirectiveVisitor`, () => {
    for (const directive of Object.values(schemaDirectives)) {
      expect(directive.prototype instanceof SchemaDirectiveVisitor).toBe(true);
    }
  });
});
