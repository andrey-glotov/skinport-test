import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { jwtConfig } from '~/configs/jwt-service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '~/entities/wallet.entity';
import { BullModule } from '@nestjs/bullmq';
import { CartConsumer } from './cart.consumer';
import { bullMqConfig } from '~/configs/bullMq-config';
import { ItemsModule } from '~/entities/items/items.module';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
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
  ],
  controllers: [CartController],
  providers: [CartService, CartConsumer],
})
export class CartModule {}
