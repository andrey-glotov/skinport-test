import { Currency } from '~/shared/types/currency';

export type ItemCurrency = keyof typeof Currency;

export type Item = {
  market_hash_name: string;
  currency: ItemCurrency;
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  quantity: number;
  created_at: number;
  updated_at: number;
};

export type ItemList = Array<Item>;

export type ItemListFetchProps = {
  currency: ItemCurrency;
  app_id: number;
};

export type DetailedItemList = Array<DetailedItem>;

export type DetailedItem = Item & {
  tradable_min_price: number;
};
