import { ApiProperty } from '@nestjs/swagger';
import { InterviewRecap } from '@prisma/client';
import { UserEntity } from '../../users/entities';

export class InterviewRecapEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  characteristic?: string;

  @ApiProperty()
  interviewDate: Date;

  @ApiProperty()
  evidenceVideo?: string;

  @ApiProperty()
  evidenceText?: string;

  @ApiProperty()
  problemStatementId: string;

  @ApiProperty()
  intervieweeId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  interviewee: UserEntity;

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
