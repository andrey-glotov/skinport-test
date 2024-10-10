import { redisConfig } from '~/configs/redis-config';

export const bullMqConfig = {
  connection: {
    host: redisConfig.host,
    port: redisConfig.port,
    username: redisConfig.username,
    password: redisConfig.password,
  },
};
