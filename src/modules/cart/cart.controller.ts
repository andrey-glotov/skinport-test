import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CartData } from './cart.validator';
import { CartService } from './cart.service';
import { AuthGuard } from '~/modules/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async makeOrder(
    @Request() request,
    @Body() body: CartData,
  ): Promise<{ status: 'ok' }> {
    return this.cartService.makeOrder(body, request.user.id);
  }
}
