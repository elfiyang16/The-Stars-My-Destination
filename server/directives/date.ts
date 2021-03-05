import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver, GraphQLString } from "graphql";
import DateFormatter from "dateformat";

const defaultFormat = "mmmm d, yyyy";
export class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    // the args of directive e.g. @date(format: "MM")
    const { format = defaultFormat } = this.args;
    // Enable Client Control By Create Args Dynamically
    // field.args.push({
    //   name: "format",
    //   type: GraphQLString,
    // });

    // field.resolve = async function (
    //   source,
    //   { format, ...otherArgs },
    //   context,
    //   info
    // ) {
    //   const date = await resolve.call(this, source, otherArgs, context, info);

    //   return DateFormatter(date, format || defaultFormat);
    // };

    field.resolve = async function (...args) {
      //return  value of the resolver function
      const date = await resolve.apply(this, args);
      console.log(date)
      // ARGS:
      //[{ id: 'C104', //ROOT
      //   landings: 1,
      //   missions: [ [Object] ],
      //   original_launch: '2013-03-01T19:10:00.000Z',
      //   reuse_count: 0,
      //   status: 'unknown',
      //   type: 'Dragon 1.0',
      //   dragon: { id: 'dragon1' } },
      // {}, //ARGS
      // { _extensionStack: GraphQLExtensionStack { extensions: [] },//CONTEXT
      //   dataSources: { spaceXAPI: [SpaceXAPI] } },
      // { fieldName: 'original_launch', //INFO
      //   fieldNodes: [ [Object] ],
      //   returnType: Date,
      //   parentType: Capsule,
      //   path:
      //    { prev: [Object], key: 'original_launch', typename: 'Capsule' },
      //   schema:
      //    GraphQLSchema {
      //      __validationErrors: [],
      //      description: undefined,
      //      extensions: undefined,
      //      astNode: [Object],
      //      extensionASTNodes: [],
      //      _queryType: Query,
      //      _mutationType: undefined,
      //      _subscriptionType: undefined,
      //      _directives: [Array],
      //      _typeMap: [Object],
      //      _subTypeMap: [Object: null prototype] {},
      //      _implementationsMap: [Object: null prototype] {} },
      //   fragments: [Object: null prototype] {},
      //   rootValue: undefined,
      //   operation:
      //    { kind: 'OperationDefinition',
      //      operation: 'query',
      //      name: [Object],
      //      variableDefinitions: [],
      //      directives: [],
      //      selectionSet: [Object],
      //      loc: [Object] },
      //   variableValues: {},
      //   cacheControl: { setCacheHint: [Function: setCacheHint], cacheHint: {} } } ]

      //FIELD:
      // { name: 'original_launch',
      // description: undefined,
      // type: Date,
      // args: [],
      // resolve: [Function],
      // subscribe: undefined,
      // isDeprecated: false,
      // deprecationReason: undefined,
      // extensions: undefined,
      // astNode:
      //  { kind: 'FieldDefinition',
      //    description: undefined,
      //    name: { kind: 'Name', value: 'original_launch', loc: [Object] },
      //    arguments: [],
      //    type: { kind: 'NamedType', name: [Object], loc: [Object] },
      //    directives: [ [Object] ],
      //    loc: { start: 224, end: 275 } } }

      return DateFormatter(date, format);
    };
    field.type = GraphQLString;
  }
}

// export default directives;
