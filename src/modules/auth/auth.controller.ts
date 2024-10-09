import { Body, Controller, Post } from '@nestjs/common';
import { Credentials } from './credentials.validator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() body: Credentials) {
    return this.authService.signIn(body);
  }
}
