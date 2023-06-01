import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateInterviewRecapDto {
  @ApiProperty()
  intervieweeName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  interviewDate: Date;

  @ApiProperty()
  evidenceVideo: string;

  @ApiProperty()
  evidenceText: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  problemStatementId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  intervieweeId: string;
}
