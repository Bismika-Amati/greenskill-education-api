import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  roleId: string;

  @ApiProperty()
  photo: string;

  @ApiProperty()
  provinceId: string;

  @ApiProperty()
  cityId: string;

  @ApiProperty()
  districtId: string;

  @ApiProperty()
  subDistrictId: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  address: string;
}
