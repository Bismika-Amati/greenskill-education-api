import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { FilePlace } from '../enums';

export class UploadMediaDto {
  @IsEnum(FilePlace)
  @IsNotEmpty()
  @ApiProperty()
  filePlace: FilePlace;
}
