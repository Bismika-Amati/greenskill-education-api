import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
