import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '~/configs/ormconfig';
import { redisConfig } from '~/configs/redis-config';
import { ItemModule } from '~/modules/item/item.module';
import { AuthModule } from '~/modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
      load: [],
    }),
    CacheModule.register(redisConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    ItemModule,
    CartModule,
    AuthModule,
  ],
})
export class AppModule {}
