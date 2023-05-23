import { PartialType } from '@nestjs/swagger';
import { CreateExistingAlternativeDto } from './create-existing-alternative.dto';

export class UpdateExistingAlternativeDto extends PartialType(CreateExistingAlternativeDto) {}
