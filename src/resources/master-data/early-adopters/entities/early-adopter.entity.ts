import { ApiProperty } from '@nestjs/swagger';
import { ProblemStatement, EarlyAdopter } from '@prisma/client';

export class EarlyAdopterEntity {
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

  constructor(partial?: Partial<EarlyAdopterEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<EarlyAdopterEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<EarlyAdopter[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
