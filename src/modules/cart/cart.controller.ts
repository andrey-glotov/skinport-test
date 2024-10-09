import { Body, Controller, Post } from '@nestjs/common';
import { CartData } from './cart.validator';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/')
  async makeOrder(@Body() body: CartData): Promise<CartData> {
    return this.cartService.makeOrder(body);
  }
}
