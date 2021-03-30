import { RedisCache } from "apollo-server-cache-redis";

export const redisCache = new RedisCache({
  connectTimeout: 5000,
  reconnectOnError: (err) => {
    console.log("Reconnect on error", err);
    const targetError = "READONLY";
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true;
    }
  },
  retryStrategy: (times) => {
    console.log("Redis Retry", times);
    if (times >= 3) {
      return undefined;
    }
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  socket_keepalive: false,
  host:
    process.env.IS_OFFLINE === "true" ? "127.0.0.1" : process.env.REDIS_HOST,
  port:
    process.env.IS_OFFLINE === "true" ? 6379 : parseInt(process.env.REDIS_PORT),
  password: process.env.IS_OFFLINE === "true" ? "" : process.env.REDIS_PASSWORD,
});

export default redisCache;
