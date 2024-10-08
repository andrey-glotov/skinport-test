import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {
  constructor(private configService: ConfigService) {}
}
