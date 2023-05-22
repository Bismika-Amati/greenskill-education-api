import { ApiProperty } from '@nestjs/swagger';
import { CustomerSegment, ProblemStatement } from '@prisma/client';

export class CustomerSegmentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  problemStatementId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  problemStatement: ProblemStatement;

  constructor(partial?: Partial<CustomerSegmentEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<CustomerSegmentEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<CustomerSegment[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
