import ComplexityPlugin from "./complexity";
import { SchemaReportPlugin, UsageReportPlugin } from "./builtinReport";
import LoggerPlugin from "./logger";
export const plugins = [
  ComplexityPlugin,
  SchemaReportPlugin,
  UsageReportPlugin,
  // LoggerPlugin, /* disable it otherwise too much info */
];
