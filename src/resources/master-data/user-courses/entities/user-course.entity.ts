import { ApiProperty } from '@nestjs/swagger';
import { CourseEntity } from '../../courses/entities';
import { UserEntity } from '../../users/entities';
import { UserCourse } from '@prisma/client';

export class UserCourseEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  feedback?: string;

  @ApiProperty()
  rating?: number;

  @ApiProperty()
  experience?: string;

  @ApiProperty()
  courseId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  course: CourseEntity;

  @ApiProperty()
  user: UserEntity;

  constructor(partial?: Partial<UserCourseEntity>) {
    if (!partial) return;

    const { ...data } = partial;

    Object.assign(this, this.mapper(data));
  }

  mapper(item: Partial<UserCourseEntity>) {
    const { ...rest } = item;

    return {
      ...rest,
    };
  }

  collection(partials: Partial<UserCourse[]>) {
    if (partials.length > 0) {
      return partials.map((item) => this.mapper(item));
    }
  }
}
