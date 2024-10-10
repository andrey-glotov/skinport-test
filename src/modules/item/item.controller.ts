import { Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemList } from './types';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/')
  getList(): Promise<ItemList> {
    return this.itemService.getList();
  }
}
