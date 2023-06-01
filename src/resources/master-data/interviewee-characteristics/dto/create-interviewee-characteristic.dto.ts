import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIntervieweeCharacteristicDto {
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
