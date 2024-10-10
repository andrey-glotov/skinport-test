import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemsModule } from '~/entities/items/items.module';

@Module({
  imports: [ItemsModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
