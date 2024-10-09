import { IsString, isString, MaxLength, MinLength } from 'class-validator';

export class Credentials {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  password: string;
}
