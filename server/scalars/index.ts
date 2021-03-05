import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";

export class MaxLength extends GraphQLScalarType {
  constructor(
    type: Readonly<GraphQLScalarTypeConfig<any, any>>,
    limit: number
  ) {
    super({
      name: `MaxLength_${limit}`,
      description: "Scalar type on max length",
      // value: outgoing value from backend server
      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `string` && value.length <= limit) {
          return serialized;
        }
        if (typeof value === `number` && !isNaN(value) && value <= limit) {
          return serialized;
        }
        throw new TypeError(`Value above limit: ${limit}`);
      },
      // value: incoming value from client as GraphQl variable
      parseValue(value) {
        return type.parseValue(value);
      },
      // value: incoming value as inline literal value in operation string
      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}

export class MinLength extends GraphQLScalarType {
  constructor(
    type: Readonly<GraphQLScalarTypeConfig<any, any>>,
    limit: number
  ) {
    super({
      name: `MinLength_${limit}`,
      description: "Scalar type on min length",
      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `string` && value.length >= limit) {
          return serialized;
        }
        if (typeof value === `number` && !isNaN(value) && value >= limit) {
          return serialized;
        }
        throw new TypeError(`Value under limit: ${limit}`);
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}

export class GreaterThan extends GraphQLScalarType {
  constructor(
    type: Readonly<GraphQLScalarTypeConfig<any, any>>,
    limit: number
  ) {
    super({
      name: `GreaterThan_${limit}`,
      description: "Scalar type on greater than",
      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `number` && !isNaN(value) && value > limit) {
          return serialized;
        }
        throw new TypeError(`Value needs to be greater than: ${limit}`);
      },

      parseValue(value) {
        console.log("value\n", value, "typeofvalue\n", typeof value);
        console.log(
          "type\n",
          type,
          "type.paraseValue\n",
          type.parseValue(value)
        );

        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}

export class LessThan extends GraphQLScalarType {
  constructor(
    type: Readonly<GraphQLScalarTypeConfig<any, any>>,
    limit: number
  ) {
    super({
      name: `LessThan_${limit}`,
      description: "Scalar type on less than",
      serialize(value) {
        const serialized = type.serialize(value);
        if (typeof value === `number` && !isNaN(value) && value < limit) {
          return serialized;
        }
        throw new TypeError(`Value needs to be less than: ${limit}`);
      },

      parseValue(value) {
        return type.parseValue(value);
      },

      parseLiteral(ast) {
        return type.parseLiteral(ast, {});
      },
    });
  }
}
