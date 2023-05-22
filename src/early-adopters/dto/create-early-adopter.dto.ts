import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEarlyAdopterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  problemStatementId: string;
}
