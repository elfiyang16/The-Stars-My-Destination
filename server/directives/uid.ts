import { SchemaDirectiveVisitor } from "apollo-server";
import { GraphQLID, GraphQLObjectType } from "graphql";
import { createHash } from "crypto";

// this gives the client ability to query uid field on the decorated Type e.g. Dragon

export class UniqueIdDirective extends SchemaDirectiveVisitor {
  visitObject(type: GraphQLObjectType) {
    const { name, from } = this.args;
    // get all fields on this type, e.g. Dragon
    const fields = type.getFields();
    if (name in fields) {
      throw new Error(`Conflicting field name ${name}`);
    }
    fields[name] = {
      name,
      type: GraphQLID,
      description: "Unique ID",
      args: [],
      resolve(object) {
        const hash = createHash("sha1");
        hash.update(type.name);
        from.forEach((fieldName) => {
          hash.update(String(object[fieldName]));
        });
        return hash.digest("hex");
      },
      deprecationReason: "No idea, guess why",
      isDeprecated: false,
      // TODO: refactor extension
      extensions: {},
    };
  }
}
