import { Logger, LOG_TYPE } from "./logger";

const logger = new Logger();
// {"status":"pass"}
export default async () => {
  try {
    // DO SOMETHING ELSE IF NEEDED
    const check = true;
  } catch (err) {
    logger.log(LOG_TYPE.ERROR, "Error at Apollo HealthCheck", {
      error: err,
    });
  }
};
