import { Injectable } from '@nestjs/common';
import { CartData } from '~/modules/cart/cart.validator';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class CartService {
  constructor(
    @InjectQueue('cart-processing') private cartProcessingQueue: Queue,
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
