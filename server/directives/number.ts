import {
  GraphQLField,
  defaultFieldResolver,
  GraphQLString,
  DirectiveLocation,
  GraphQLDirective,
} from "graphql";
import { SchemaDirectiveVisitor } from "apollo-server";
import numeral from "numeral";

// const defaultFormat = "0,0";

// compare to dateFormat, also include getDirectiveDeclaration
export class NumberFormatDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration() {
    return new GraphQLDirective({
      name: `number`,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        format: {
          type: GraphQLString,
          defaultValue: "0,0",
        },
      },
    });
  }

  visitFieldDefinition(field: GraphQLField<any, any, any>) {
    const { resolve = defaultFieldResolver } = field;
    // const { format = defaultFormat } = this.args; maybe don't need default
    const { format } = this.args;

    console.log("this.args\n", this.args);

    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (
        typeof result === "string" &&
        result.indexOf("0") === -1 &&
        !Number.isNaN(result)
      ) {
        return numeral(result).format(format) ?? result;
      }
    };

    field.type = GraphQLString;
  }
}
