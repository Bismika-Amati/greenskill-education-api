import { PartialType } from '@nestjs/swagger';
import { CreateSubDistrictDto } from './create-sub-district.dto';

export class UpdateSubDistrictDto extends PartialType(CreateSubDistrictDto) {}
