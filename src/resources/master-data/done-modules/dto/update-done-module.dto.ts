import { PartialType } from '@nestjs/swagger';
import { CreateDoneModuleDto } from './create-done-module.dto';

export class UpdateDoneModuleDto extends PartialType(CreateDoneModuleDto) {}
