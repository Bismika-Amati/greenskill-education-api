import { PartialType } from '@nestjs/swagger';
import { CreateEarlyAdopterDto } from './create-early-adopter.dto';

export class UpdateEarlyAdopterDto extends PartialType(CreateEarlyAdopterDto) {}
