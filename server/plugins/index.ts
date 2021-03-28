import ComplexityPlugin from "./complexity";
import { SchemaReportPlugin, UsageReportPlugin } from "./builtinReport";
import LoggerPlugin from "./logger";
import ErrorHandlerPlugin from "./errorHandler";
export const plugins = [
  ComplexityPlugin,
  SchemaReportPlugin,
  UsageReportPlugin,
  ErrorHandlerPlugin,
  // LoggerPlugin, /* disable it otherwise too much info */
];
