import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Credentials } from './credentials.validator';
import { Token } from './token.validator';
import { createHash } from '~/shared/utils/create-hash';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '~/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn({ username, ...data }: Credentials): Promise<Token> {
    const password = createHash(
      data.password,
      this.configService.get<string>('APP_PASSWORD_SECRET_KEY'),
    );

    const user = await this.userRepository.findOneBy({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password: _, ...tokenInfo } = user;

    const token = this.jwtService.sign(tokenInfo, {
      secret: this.configService.get<string>('APP_JWT_SECRET_KEY'),
    });

    return new Token({ token });
  }
}
