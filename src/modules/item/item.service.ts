import { Injectable } from '@nestjs/common';
import { DetailedItemList } from './types';
import { DetailedItems } from './detailed-list.transformer';
import { Cache } from '@nestjs/cache-manager';
import { ItemRepository } from '~/entities/items/item.repository';
import { ItemListPropsValidator } from '~/entities/items/items-props.validator';

@Injectable()
export class ItemService {
  constructor(
    private cacheManager: Cache,
    private itemService: ItemRepository,
  ) {}

  async getList(): Promise<DetailedItemList> {
    const params = new ItemListPropsValidator();
    try {
      const key = `/items/${JSON.stringify(params)}`;
      const cache = await this.cacheManager.get<DetailedItemList>(key);
      if (cache) {
        return cache;
      }
      const [tradableItems, notTradableItems] = await Promise.all([
        this.itemService.getItems({ ...params, tradable: true }),
        this.itemService.getItems({ ...params, tradable: false }),
      ]);

      const result = new DetailedItems({
        tradableItems,
        notTradableItems,
      }).items;

      /**
       * cache response if it successfully
       */
      await this.cacheManager.set(key, result, 1000 * 60 * 5);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
