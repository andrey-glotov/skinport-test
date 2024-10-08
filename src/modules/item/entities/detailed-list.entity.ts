import { DetailedItem, Item, ItemList } from '~/modules/item/types';

export class DetailedItems {
  constructor(
    private readonly params: {
      tradableItems: ItemList;
      notTradableItems: ItemList;
    },
  ) {}

  get items(): Array<DetailedItem> {
    const { tradableItems, notTradableItems } = this.params;

    /**
     * Так как структура ответа с апи очень большая,
     * считаю что в этой ситуации имеет смысл оптимизировать алгоритм до O(n)
     */
    const map = new Map<string, Item>();
    tradableItems.forEach((item) => {
      map.set(item.market_hash_name, item);
    });

    return notTradableItems.map((item) => {
      const tradable = map.get(item.market_hash_name);

      if (!tradable) {
        throw new Error(
          'can not find tradable item, make sure that you pass correct tradable list items',
        );
      }

      return {
        ...item,
        tradable_min_price: tradable.min_price,
      };
    });
  }
}
