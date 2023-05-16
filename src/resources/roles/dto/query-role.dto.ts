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

  @InArray([5, 15, 25, 50])
  @IsOptional()
  perPage?: PaginatorLimit;
}
