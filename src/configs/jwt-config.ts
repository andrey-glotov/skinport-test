import { JwtModuleOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

export const jwtConfig: JwtModuleOptions = {
  global: true,
  publicKey: process.env.JWT_PUBLIC_KEY,
  secret: process.env.APP_JWT_SECRET_KEY,
  signOptions: { expiresIn: '1 days' },
};
