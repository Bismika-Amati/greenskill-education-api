import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubModuleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  video: string;

  @IsString()
  @ApiProperty()
  picture: string;

  @IsString()
  @ApiProperty()
  courseId: string;
}
