import { HttpException, Injectable } from '@nestjs/common';
import { ItemList, ItemListFetchProps } from '~/modules/item/types';
import { withQuery } from 'ufo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItemRepository {
  constructor(private readonly configService: ConfigService) {}

  private get endpointUrl(): string {
    return this.configService.get<string>('ITEM_SERVICE_URL') + '/v1/items';
  }

  async getItems(
    params: ItemListFetchProps & { tradable: boolean },
  ): Promise<ItemList> {
    const url = withQuery(this.endpointUrl, params);
    const data = await fetch(url);

    if (data.status !== 200) {
      throw new HttpException(await data.json(), data.status);
    }

    return data.json();
  }
}
