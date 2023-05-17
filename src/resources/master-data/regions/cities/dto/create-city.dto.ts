import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
