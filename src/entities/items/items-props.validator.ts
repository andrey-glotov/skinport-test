import { ItemCurrency, ItemListFetchProps } from '~/modules/item/types';
import { Transform } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';
import { OneOf } from '~/shared/validators/oneOf';
import { Currency } from '~/shared/types/currency';

export class ItemListPropsValidator implements ItemListFetchProps {
  constructor(props?: Partial<ItemListFetchProps>) {
    Object.assign(this, props);
  }

  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsInt()
  @Min(1)
  app_id: ItemListFetchProps['app_id'] = 730;

  @IsString()
  @OneOf(Object.keys(Currency), { message: 'this currency is not allowed' })
  currency: ItemCurrency = 'EUR';
}
