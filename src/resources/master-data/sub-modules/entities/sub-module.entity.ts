import { ApiProperty } from '@nestjs/swagger';
import { CourseEntity } from '../../courses/entities';
import { SubModule } from '@prisma/client';

export class SubModuleEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  video?: string;

  @ApiProperty()
  picture?: string;

  @ApiProperty()
  courseId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  course: CourseEntity;

  constructor(partial?: Partial<SubModuleEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<SubModuleEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<SubModule[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
