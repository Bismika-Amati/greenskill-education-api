import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVillagePictureDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  photo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  villageId: string;
}
