import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProblemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  interviewRecapId: string;
}
