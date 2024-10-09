import { IsInt, IsString, Min } from 'class-validator';
import type { ItemCurrency, ItemListFetchProps } from './types';
import { OneOf } from '~/shared/validators/oneOf';
import { Transform } from 'class-transformer';

const currencies: Array<ItemCurrency> = [
  'BRL',
  'CAD',
  'CHF',
  'CNY',
  'CZK',
  'EUR',
  'AUD',
  'DKK',
  'GBP',
  'HRK',
  'NOK',
  'PLN',
  'RUB',
  'SEK',
  'TRY',
  'USD',
];

export class ItemListPropsValidator implements ItemListFetchProps {
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsInt()
  @Min(1)
  app_id: ItemListFetchProps['app_id'] = 730;

  @IsString()
  @OneOf(currencies, { message: 'this currency is not allowed' })
  currency: ItemListFetchProps['currency'] = 'EUR';
}
