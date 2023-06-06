import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVillageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cityId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subDistrictId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  postcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @ApiProperty()
  latlong: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  picId: string;
}
