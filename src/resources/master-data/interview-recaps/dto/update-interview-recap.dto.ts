import { PartialType } from '@nestjs/swagger';
import { CreateInterviewRecapDto } from './create-interview-recap.dto';

export class UpdateInterviewRecapDto extends PartialType(CreateInterviewRecapDto) {}
