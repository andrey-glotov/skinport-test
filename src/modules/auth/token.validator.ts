import { IsString, MinLength } from 'class-validator';

export class Token {
  constructor(data: Partial<Token>) {
    Object.assign(this, data);
  }
  @IsString()
  @MinLength(1)
  token: string;
}
