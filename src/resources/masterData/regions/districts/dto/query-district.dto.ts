import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { InArray } from 'src/lib/validators';
import { PaginatorLimit } from 'src/lib/enums';
import { toNumber } from 'src/lib/helper';

export class QueryDistrictDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page?: number;

  @InArray([10, 25, 50, 100])
  @IsOptional()
  perPage?: PaginatorLimit;
}
