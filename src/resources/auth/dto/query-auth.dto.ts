import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QueryAuthDto {
  @IsString()
  @ApiProperty()
  role?: string;
}
