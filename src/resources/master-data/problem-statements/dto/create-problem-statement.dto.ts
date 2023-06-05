import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProblemStatementDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  topic: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  villageId: string;
}
