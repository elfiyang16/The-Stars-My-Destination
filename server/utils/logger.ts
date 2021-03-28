import {
  createLogger,
  format,
  transports,
  addColors,
  Logger as WinstonLogger,
} from "winston";
import path from "path";

const LOG_DESTINATION = path.resolve(__dirname, "../../logs");

const INFO_LOG = "info-log.log";
const DATA_LOG = "data-log.log";
const WARN_LOG = "warn-log.log";
const ERROR_LOG = "error-log.log";

const logConfig = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    custom: 5,
  },
  colors: {
    error: "red",
    debug: "blue",
    warn: "yellow",
    data: "cyan",
    info: "green",
    custom: "yellow",
  },
};

addColors(logConfig.colors);

export enum LOG_TYPE {
  INFO = "info",
  DATA = "data",
  ERROR = "error",
  WARN = "warn",
}

export const loggerFactory = (): WinstonLogger => {
  const logger: WinstonLogger = createLogger({
    level: "custom", // Log only if info.level less than or equal to "custom"
    levels: logConfig.levels,
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: "Stars-My-Destiny" },
    transports: [
      new transports.File({
        dirname: LOG_DESTINATION,
        filename: INFO_LOG,
        level: "info",
      }),
      new transports.File({
        dirname: LOG_DESTINATION,
        filename: DATA_LOG,
        level: "data",
      }),
      new transports.File({
        dirname: LOG_DESTINATION,
        filename: WARN_LOG,
        level: "warn",
      }),
      new transports.File({
        dirname: LOG_DESTINATION,
        filename: ERROR_LOG,
        level: "error",
      }),
    ],
  });
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize({ all: true }), format.simple()),
      })
    );
  }
  return logger;
};

export class Logger {
  constructor(public logger: WinstonLogger = loggerFactory()) {}

  public log(type: LOG_TYPE, message?: string, meta?: any): any {
    this.logger.log({ level: type, message: message, ...meta });
  }
}
