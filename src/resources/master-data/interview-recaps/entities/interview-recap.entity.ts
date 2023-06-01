import { ApiProperty } from '@nestjs/swagger';
import { InterviewRecap } from '@prisma/client';

export class InterviewRecapEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  intervieweeName: string;

  @ApiProperty()
  interviewDate: Date;

  @ApiProperty()
  evidenceVideo?: string;

  @ApiProperty()
  evidenceText?: string;

  @ApiProperty()
  problemStatementId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  constructor(partial?: Partial<InterviewRecapEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<InterviewRecapEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<InterviewRecap[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
