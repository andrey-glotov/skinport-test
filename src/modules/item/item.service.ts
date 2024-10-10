import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DetailedItemList, ItemList, ItemListFetchProps } from './types';
import { withQuery } from 'ufo';
import { DetailedItems } from './detailed-list.transformer';
import { Cache } from '@nestjs/cache-manager';
import { ItemListPropsValidator } from '~/modules/item/item-list-props.validator';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class ItemService {
  constructor(
    private readonly configService: ConfigService,
    private cacheManager: Cache,
  ) {}

  private get endpointUrl(): string {
    return this.configService.get<string>('ITEM_SERVICE_URL') + '/v1/items';
  }

  private async getItems(
    params: ItemListFetchProps & { tradable: boolean },
  ): Promise<ItemList> {
    const url = withQuery(this.endpointUrl, params);
    const data = await fetch(url);

    if (data.status !== 200) {
      throw new HttpException(await data.json(), data.status);
    }

    return data.json();
  }

  async getList(): Promise<DetailedItemList> {
    const params = new ItemListPropsValidator();
    try {
      const key = `/items/${JSON.stringify(params)}`;
      const cache = await this.cacheManager.get<DetailedItemList>(key);
      if (cache) {
        return cache;
      }

      const [tradableItems, notTradableItems] = await Promise.all([
        this.getItems({ ...params, tradable: true }),
        this.getItems({ ...params, tradable: false }),
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
