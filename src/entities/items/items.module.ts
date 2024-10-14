import { Module } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { ItemListPropsValidator } from './items-props.validator';

@Module({
  providers: [ItemRepository, ItemListPropsValidator],
  exports: [ItemRepository, ItemListPropsValidator],
})
export class ItemsModule {}
