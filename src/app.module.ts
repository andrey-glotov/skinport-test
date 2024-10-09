import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './modules/item/item.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './db/ormconfig';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASSWORD,
      no_ready_check: true,
      store: redisStore,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ItemModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
