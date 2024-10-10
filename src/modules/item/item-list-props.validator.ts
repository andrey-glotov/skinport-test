import { IsInt, IsString, Min } from 'class-validator';
import type { ItemListFetchProps } from './types';
import { OneOf } from '~/shared/validators/oneOf';
import { Transform } from 'class-transformer';
import { Currency } from '~/shared/types/currency';

export class ItemListPropsValidator implements ItemListFetchProps {
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsInt()
  @Min(1)
  app_id: ItemListFetchProps['app_id'] = 730;

  @IsString()
  @OneOf(Object.keys(Currency), { message: 'this currency is not allowed' })
  currency: ItemListFetchProps['currency'] = 'EUR';
}
