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
    console.log(await this.cartProcessingQueue.clean(1000, 1000));
    await this.cartProcessingQueue.add(
      'process-order',
      {
        cart,
        userId,
      },
      {
        attempts: 10,
        backoff: {
          type: 'exponential',
          delay: 1000 * 30,
        },
      },
    );

    return { status: 'ok' };
  }
}
