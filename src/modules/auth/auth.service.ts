import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Credentials } from './credentials.validator';
import { Token } from './token.validator';
import { createHash } from '~/shared/utils/create-hash';
import { ConfigService } from '@nestjs/config';
import { userRepository } from '~/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: Credentials): Promise<Token> {
    const user = await userRepository.findOneByOrFail({
      username: data.username,
    });

    const password = createHash(
      data.password,
      this.configService.get<string>('APP_PASSWORD_SECRET_KEY'),
    );

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const { password: _, ...tokenInfo } = user;

    const token = this.jwtService.sign(tokenInfo, {
      secret: this.configService.get<string>('APP_JWT_SECRET_KEY'),
    });

    return new Token({ token });
  }
}
