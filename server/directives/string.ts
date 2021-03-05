import { SchemaDirectiveVisitor } from "apollo-server";
import {
  defaultFieldResolver,
  GraphQLDirective,
  DirectiveLocation,
  GraphQLField,
  GraphQLSchema,
} from "graphql";
import {
  camelCase,
  capitalize,
  upperCase,
  lowerCase,
  kebabCase,
  snakeCase,
  trim,
  deburr,
} from "lodash";

export type LodashTransform = (arg: string) => string;

const StringDirectiveFactory = (
  directiveName: string,
  transform: LodashTransform
): typeof SchemaDirectiveVisitor => {
  class StringDirective extends SchemaDirectiveVisitor {
    static getDirectiveDeclaration(
      directiveName: string,
      schema: GraphQLSchema
    ): GraphQLDirective {
      // if currentDirective already exist do nothing
      const currentDirective = schema.getDirective(directiveName);
      if (currentDirective) {
        return currentDirective;
      }

      //  if not, then create a new one as requested
      return new GraphQLDirective({
        name: directiveName,
        locations: [DirectiveLocation.FIELD_DEFINITION],
        description: `string directive to manupulate ${this.name}`,
        isRepeatable: true,
      });
    }

    visitFieldDefinition(field: GraphQLField<any, any>) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        const result = await resolve.apply(this, args);
        console.log(typeof result);
        if (typeof result === "string") {
          return transform(result);
        }
        return result;
      };
    }
  }
  return StringDirective;
};

export const UpperStringDirective = StringDirectiveFactory("upper", upperCase);
export const LowerStringDirective = StringDirectiveFactory("lower", lowerCase);
export const CamelCaseStringDirective = StringDirectiveFactory(
  "camelCase",
  camelCase
);
export const DeburrStringDirective = StringDirectiveFactory("deburr", deburr);
export const CapitalizeStringDirective = StringDirectiveFactory(
  "capitalize",
  capitalize
);
export const KebabCaseStringDirective = StringDirectiveFactory(
  "kebabCase",
  kebabCase
);
export const TrimStringDirective = StringDirectiveFactory("trim", trim);
export const SnakeCaseStringDirective = StringDirectiveFactory(
  "snake",
  snakeCase
);
