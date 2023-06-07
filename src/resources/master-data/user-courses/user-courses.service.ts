import { Injectable } from '@nestjs/common';
import { UserCourse, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateUserCourseDto,
  QueryUserCourseDto,
  UpdateUserCourseDto,
} from './dto';

@Injectable()
export class UserCoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createUserCourseDto: CreateUserCourseDto): Promise<UserCourse> {
    return await this.prisma.userCourse.create({ data: createUserCourseDto });
  }

  async findAll(
    queryDto: QueryUserCourseDto,
  ): Promise<PaginatedResult<UserCourse>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<UserCourse, Prisma.UserCourseFindManyArgs>(
      this.prisma.userCourse,
      {
        where: {
          userId: queryDto.userId,
          courseId: queryDto.courseId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<UserCourse | null> {
    return await this.prisma.userCourse.findUnique({
      where: { id },
      include: {
        course: true,
        user: true,
      },
    });
  }

  async update(
    id: string,
    updateUserCourseDto: UpdateUserCourseDto,
  ): Promise<UserCourse> {
    return await this.prisma.userCourse.update({
      where: { id },
      data: updateUserCourseDto,
    });
  }

  async remove(id: string): Promise<UserCourse> {
    return await this.prisma.userCourse.delete({
      where: { id },
    });
  }
}
