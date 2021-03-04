import { SchemaDirectiveVisitor } from "apollo-server";
import { defaultFieldResolver } from "graphql";
import DateFormatter from "dateformat";

export class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format } = this.args;
    console.log(this.args);
    field.resolve = async function (...args) {
      const date = await resolve.apply(this, args);
      console.log(field);
      return DateFormatter(date, format);
    };
  }
}

// export default directives;
