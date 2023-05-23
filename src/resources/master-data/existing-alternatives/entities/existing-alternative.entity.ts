import { ApiProperty } from '@nestjs/swagger';
import { ProblemStatement, ExistingAlternative } from '@prisma/client';

export class ExistingAlternativeEntity {
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

  constructor(partial?: Partial<ExistingAlternativeEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<ExistingAlternativeEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<ExistingAlternative[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
