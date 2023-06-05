import { PartialType } from '@nestjs/swagger';
import { CreateSubModuleDto } from './create-sub-module.dto';

export class UpdateSubModuleDto extends PartialType(CreateSubModuleDto) {}
