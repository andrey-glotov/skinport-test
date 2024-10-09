import {
  IsInt,
  Min,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CartItem {
  @IsString()
  @MinLength(1)
  id: string;

  @IsInt()
  @Min(0)
  quantity: number;
}

export class CartData {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CartItem)
  items: Array<CartItem>;
}
