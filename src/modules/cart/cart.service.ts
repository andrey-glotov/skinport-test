import { BadRequestException, Injectable } from '@nestjs/common';
import { CartData } from '~/modules/cart/cart.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '~/entities/wallet.entity';
import * as FloatToolkit from '@float-toolkit/core';
import { Currency } from '~/shared/types/currency';

const ft = new FloatToolkit(2);

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}
  async makeOrder(cart: CartData, userId: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneBy({
      user: userId,
      currency: Currency[cart.currency],
    });

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    const totalPrice = cart.items.reduce<number>((accum, item) => {
      return ft.round(accum + ft.round(item.quantity * item.price));
    }, 0);
    if (totalPrice > wallet.balance) {
      throw new BadRequestException('Wallet balance is not enough');
    }

    const balanceAfterTransaction = ft.round(wallet.balance - totalPrice);

    return this.walletRepository.save({
      ...wallet,
      balance: balanceAfterTransaction,
    });
  }
}
