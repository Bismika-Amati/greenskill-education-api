import { ApiProperty } from '@nestjs/swagger';
import { VillageEntity } from '../../villages/entities';
import { ProblemStatement } from '@prisma/client';

export class ProblemStatementEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  villageId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  village: VillageEntity;

  constructor(partial?: Partial<ProblemStatementEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<ProblemStatementEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<ProblemStatement[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
