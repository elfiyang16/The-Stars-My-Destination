/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SchemaDirectiveVisitor } from "apollo-server";
import {
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLInputField,
  GraphQLField,
} from "graphql";
import { MaxLength, MinLength, GreaterThan, LessThan } from "../scalars";

export interface CustomScalarClass<T = any> {
  new (...args: any[]): T;
}

const LimitDirectiveFactory = (
  ScalarType: CustomScalarClass
): typeof SchemaDirectiveVisitor => {
  class LimitDirective extends SchemaDirectiveVisitor {
    visitInputFieldDefinition(
      field: GraphQLInputField
    ): GraphQLInputField | void | null {
      this.wrapType(field);
    }

    visitFieldDefinition(
      field: GraphQLField<any, any, any>
    ): GraphQLField<any, any> | void | null {
      this.wrapType(field);
    }

    wrapType(field: GraphQLField<any, any, any> | GraphQLInputField) {
      if (
        field.type instanceof GraphQLNonNull &&
        field.type.ofType instanceof GraphQLScalarType
        /* field type is a custom scalar whose ofType resolve to a scalar */
      ) {
        field.type = new GraphQLNonNull(
          new ScalarType(field.type.ofType, this.args["limit"])
        );
      } else if (
        field.type instanceof
        GraphQLScalarType /* field type itself is scalar, e.g. Int */
      ) {
        // the args here is the directive arges, e.g. { limit: -1 }
        field.type = new ScalarType(field.type, this.args["limit"]);
      } else {
        throw new Error(`Not a scalar type: ${field.type}`);
      }
    }
  }

  return LimitDirective;
};

export const MaxLengthDirective = LimitDirectiveFactory(MaxLength);

export const MinLengthDirective = LimitDirectiveFactory(MinLength);

export const GreaterThanDirective = LimitDirectiveFactory(GreaterThan);

export const LessThanDirective = LimitDirectiveFactory(LessThan);
