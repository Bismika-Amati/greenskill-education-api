import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { InArray } from 'src/lib/validators';
import { toNumber } from 'src/lib/helper/cast.helper';
import { PaginatorLimit } from 'src/lib/enums';

export class QueryRoleDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page?: number;

  @InArray([10, 25, 50, 100])
  @IsOptional()
  perPage?: PaginatorLimit;
}
