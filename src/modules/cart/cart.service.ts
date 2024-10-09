import { Injectable } from '@nestjs/common';
import { CartData } from '~/modules/cart/cart.validator';

@Injectable()
export class CartService {
  async makeOrder(cart: CartData): Promise<CartData> {
    return cart;
  }
}
