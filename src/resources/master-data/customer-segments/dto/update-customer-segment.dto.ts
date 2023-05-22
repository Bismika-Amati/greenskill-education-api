import { PartialType } from '@nestjs/swagger';
import { CreateCustomerSegmentDto } from './create-customer-segment.dto';

export class UpdateCustomerSegmentDto extends PartialType(
  CreateCustomerSegmentDto,
) {}
