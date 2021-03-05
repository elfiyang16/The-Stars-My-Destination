import {DateFormatDirective} from "./date"
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


export const schemaDirectives = {
  date: DateFormatDirective,
  //•
  upperCase: UpperStringDirective,
  lowerCase: LowerStringDirective,
  camelCase: CamelCaseStringDirective,
  deburr: DeburrStringDirective,
  capitalize: CapitalizeStringDirective,
  kebabCase: KebabCaseStringDirective,
  snakeCase: SnakeCaseStringDirective,
  trim: TrimStringDirective,
}

