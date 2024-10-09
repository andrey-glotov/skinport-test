import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '~/configs/ormconfig';
import { redisConfig } from '~/configs/redis-config';
import { ItemModule } from '~/modules/item/item.module';
import { AuthModule } from '~/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '~/configs/jwt-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register(redisConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    ItemModule,
    //  AuthModule,
  ],
})
export class AppModule {}
