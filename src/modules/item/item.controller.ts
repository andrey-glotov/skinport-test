import { Controller, Get, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemList } from './types';
import { ItemListPropsValidator } from './item-list-props.validator';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  getList(@Query() params: ItemListPropsValidator): Promise<ItemList> {
    return this.itemService.getList(params);
  }
}
