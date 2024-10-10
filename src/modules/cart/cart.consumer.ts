import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Item, ItemList } from '~/modules/item/types';
import { Injectable } from '@nestjs/common';
import { ItemsService } from '~/entities/items/items.service';
import { CartData } from './cart.validator';
import { ItemListPropsValidator } from '~/entities/items/items-props.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '~/entities/wallet.entity';
import { Repository } from 'typeorm';
import { Currency } from '~/shared/types/currency';
import * as FloatToolkit from '@float-toolkit/core';

const ft = new FloatToolkit(2);

type CartJob = Job<{
  cart: CartData;
  userId: number;
}>;

@Injectable()
@Processor('cart-processing')
export class CartConsumer extends WorkerHost {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private itemsService: ItemsService,
  ) {
    super();
  }
  async process(job: CartJob): Promise<Wallet | { message: string }> {
    const [items, wallet] = await Promise.all([
      this.itemsService.getItems({
        ...new ItemListPropsValidator({
          currency: job.data.cart.currency,
        }),
        tradable: true,
      }),
      this.walletRepository.findOneBy({
        user: job.data.userId,
        currency: Currency[job.data.cart.currency],
      }),
    ]);

    if (!wallet) {
      return { message: 'no Wallet' };
    }

    const totalPrice = job.data.cart.items.reduce<number>((accum, item) => {
      return ft.round(accum + ft.round(item.quantity * item.price));
    }, 0);

    if (totalPrice > wallet.balance) {
      return { message: 'Wallet balance is not enough' };
    }

    const balanceAfterTransaction = ft.round(wallet.balance - totalPrice);

    const itemsMap = new Map<string, Item>();
    items.forEach((item) => {
      itemsMap.set(item.market_hash_name, item);
    });

    const existInOrder = job.data.cart.items.every((cartItem) => {
      const item = itemsMap.get(cartItem.id);
      if (!item) {
        return false;
      }
      return item.quantity >= cartItem.quantity;
    });

    if (!existInOrder) {
      return { message: 'The product is out of stock' };
    }

    return this.walletRepository.save({
      ...wallet,
      balance: balanceAfterTransaction,
    });
  }

  @OnWorkerEvent('completed')
  async onCompleted(job: CartJob, result: ItemList) {
    console.log('completed', result);
    // тут по идее можно отправлять емейл или еще что-то
  }
}
