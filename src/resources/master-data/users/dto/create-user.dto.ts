import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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

  @IsString()
  @ApiProperty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roleId: string;

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
}
