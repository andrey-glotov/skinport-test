import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { jwtConfig } from '~/configs/jwt-service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '~/entities/wallet.entity';

@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([Wallet])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
