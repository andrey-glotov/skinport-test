import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleOptions } from '@nestjs/cache-manager';

import * as dotenv from 'dotenv';
dotenv.config();

export const redisConfig: CacheModuleOptions = {
  isGlobal: true,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  no_ready_check: true,
  store: redisStore,
};
