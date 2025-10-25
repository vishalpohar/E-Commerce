import Redis from "ioredis";
import envars from "./enVars.js";

export const redis = new Redis(envars.upstash_redis_url);
