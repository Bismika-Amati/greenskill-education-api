import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubDistrictDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
