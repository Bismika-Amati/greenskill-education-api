import { PartialType } from '@nestjs/swagger';
import { CreateVillagePictureDto } from './create-village-picture.dto';

export class UpdateVillagePictureDto extends PartialType(
  CreateVillagePictureDto,
) {}
