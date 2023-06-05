import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInterviewRecapDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  intervieweeName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  interviewDate: string;

  @IsString()
  @ApiProperty()
  evidenceVideo: string;

  @IsString()
  @ApiProperty()
  evidenceText: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  problemStatementId: string;
}
