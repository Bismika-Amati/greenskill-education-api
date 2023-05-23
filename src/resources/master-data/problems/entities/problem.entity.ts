import { ApiProperty } from '@nestjs/swagger';
import { InterviewRecapEntity } from '../../interview-recaps/entities';
import { Problem } from '@prisma/client';

export class ProblemEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  interviewRecapId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  interviewRecap: InterviewRecapEntity;

  constructor(partial?: Partial<ProblemEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<ProblemEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<Problem[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
