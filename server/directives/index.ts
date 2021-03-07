import { DateFormatDirective } from "./date";
import { UniqueIdDirective } from "./uid";
import { NumberFormatDirective } from "./number";
import {
  UpperStringDirective,
  LowerStringDirective,
  CamelCaseStringDirective,
  DeburrStringDirective,
  CapitalizeStringDirective,
  KebabCaseStringDirective,
  TrimStringDirective,
  SnakeCaseStringDirective,
} from "./string";
import {
  MaxLengthDirective,
  MinLengthDirective,
  GreaterThanDirective,
  LessThanDirective,
} from "./limit";

export const schemaDirectives = {
  date: DateFormatDirective,
  //•string
  upperCase: UpperStringDirective,
  lowerCase: LowerStringDirective,
  camelCase: CamelCaseStringDirective,
  deburr: DeburrStringDirective,
  capitalize: CapitalizeStringDirective,
  kebabCase: KebabCaseStringDirective,
  snakeCase: SnakeCaseStringDirective,
  trim: TrimStringDirective,
  //*number|string -limit
  greater: GreaterThanDirective,
  less: LessThanDirective,
  max: MaxLengthDirective,
  min: MinLengthDirective,
  // *new field
  uniqueID: UniqueIdDirective,
  // *number
  number: NumberFormatDirective,
};
