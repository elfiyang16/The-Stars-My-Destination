import { Logger, LOG_TYPE } from "../utils/logger";

type Next = () => Promise<any>;

const logger = new Logger();

export default async (req, res, next: Next) => {
  /* All the changes here to the header will be passed to context obj if req.headers is used */
  req.headers["Access-Control-Allow-Origin"] = "*";
  req.headers["Access-Control-Allow-Headers"] =
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, client-name, client-version";
  req.headers["Access-Control-Allow-Methods"] =
    "PUT, POST, GET, DELETE, OPTIONS";

  if (req.method === "OPTIONS") {
    return (req.body = 200);
  } else {
    await next();
  }
};
