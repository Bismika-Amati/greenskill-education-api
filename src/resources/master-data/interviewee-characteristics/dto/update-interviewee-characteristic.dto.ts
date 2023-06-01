import { PartialType } from '@nestjs/swagger';
import { CreateIntervieweeCharacteristicDto } from './create-interviewee-characteristic.dto';

export class UpdateIntervieweeCharacteristicDto extends PartialType(
  CreateIntervieweeCharacteristicDto,
) {}
