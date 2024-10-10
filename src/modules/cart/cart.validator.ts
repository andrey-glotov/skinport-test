import {
  IsInt,
  Min,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Currency } from '~/shared/types/currency';
import { OneOf } from '~/shared/validators/oneOf';

export class CartItem {
  @IsString()
  @MinLength(1)
  id: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CartData {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CartItem)
  items: Array<CartItem>;

  @IsString()
  @OneOf(Object.keys(Currency), { message: 'this currency is not allowed' })
  currency: string = 'EUR';
}
