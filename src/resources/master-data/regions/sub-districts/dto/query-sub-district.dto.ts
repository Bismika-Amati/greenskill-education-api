import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { InArray } from 'src/lib/validators';
import { OrderType, PaginatorLimit } from 'src/lib/enums';
import { toNumber } from 'src/lib/helper';
import { OrderBy } from '../enums/order-by.enum';

export class QuerySubDistrictDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page?: number;

  @InArray([10, 25, 50, 100])
  @IsOptional()
  perPage?: PaginatorLimit;

  @IsEnum(OrderBy)
  @IsOptional()
  orderBy?: OrderBy;

  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType;

  @IsOptional()
  search?: string;

  @IsOptional()
  districtId?: string;

  get getOrderBy() {
    if (this.orderBy)
      return {
        [this.orderBy]: this.orderType ?? OrderType.DESC,
      };
  }
}
