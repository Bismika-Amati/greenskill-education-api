import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;

  @IsNumber()
  @ApiProperty()
  rating: number;

  @IsString()
  @ApiProperty()
  feedback: string;

  @IsString()
  @ApiProperty()
  experience: string;
}
