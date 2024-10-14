import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '~/entities/wallet.entity';
import { BullModule } from '@nestjs/bullmq';
import { CartConsumer } from './cart.consumer';
import { bullMqConfig } from '~/configs/bullMq-config';
import { ItemsModule } from '~/entities/items/items.module';
import { AuthModule } from '~/modules/auth/auth.module';
import * as FloatToolkit from '@float-toolkit/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    BullModule.registerQueue({
      name: 'cart-processing',
      connection: bullMqConfig.connection,
    }),
    BullModule.registerFlowProducer({
      name: 'cart-processing',
      connection: bullMqConfig.connection,
    }),
    ItemsModule,
    AuthModule,
  ],
  controllers: [CartController],
  providers: [
    CartService,
    CartConsumer,
    {
      provide: FloatToolkit,
      useValue: new FloatToolkit(2),
    },
  ],
})
export class CartModule {}
