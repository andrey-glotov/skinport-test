import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '~/configs/ormconfig';
import { redisConfig } from '~/configs/redis-config';
import { ItemModule } from '~/modules/item/item.module';
import { AuthModule } from '~/modules/auth/auth.module';
import { CartModule } from '~/modules/cart/cart.module';
import { BullModule } from '@nestjs/bullmq';
import { bullMqConfig } from '~/configs/bullMq-config';
import { ItemsModule } from '~/entities/items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register(redisConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot(bullMqConfig),
    ItemModule,
    CartModule,
    AuthModule,
    ItemsModule,
  ],
})
export class AppModule {}
