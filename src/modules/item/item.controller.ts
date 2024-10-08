import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemList } from './types';
import { ItemListPropsEntity } from './entities/item-list-props.entity';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  getList(@Query() params: ItemListPropsEntity): Promise<ItemList> {
    return this.itemService.getList(params);
  }
}
