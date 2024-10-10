import { Injectable } from '@nestjs/common';
import { CartData } from '~/modules/cart/cart.validator';
import * as FloatToolkit from '@float-toolkit/core';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { ItemsService } from '~/entities/items/items.service';

const ft = new FloatToolkit(2);

@Injectable()
export class CartService {
  constructor(
    @InjectQueue('cart-processing') private cartProcessingQueue: Queue,
    private itemService: ItemsService,
  ) {}

  async makeOrder(cart: CartData, userId: number): Promise<{ status: 'ok' }> {
    await this.cartProcessingQueue.add(
      'process-order',
      {
        cart,
        userId,
      },
      {
        repeat: {
          every: 1000 * 60 * 5,
          count: 10,
        },
      },
    );

    return { status: 'ok' };
  }
}
