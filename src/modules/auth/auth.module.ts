import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '~/configs/jwt-config';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  constructor(private jwtModule: JwtModule) {}
}
