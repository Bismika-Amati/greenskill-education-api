import { Injectable } from '@nestjs/common';
import { CourseSkill, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCourseSkillDto,
  QueryCourseSkillDto,
  UpdateCourseSkillDto,
} from './dto';

@Injectable()
export class CourseSkillsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCourseSkillDto: CreateCourseSkillDto,
  ): Promise<CourseSkill> {
    return await this.prisma.courseSkill.create({ data: createCourseSkillDto });
  }

  async findAll(
    queryDto: QueryCourseSkillDto,
  ): Promise<PaginatedResult<CourseSkill>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<CourseSkill, Prisma.CourseSkillFindManyArgs>(
      this.prisma.courseSkill,
      {
        where: {
          name: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
          courseId: queryDto.couseId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<CourseSkill | null> {
    return await this.prisma.courseSkill.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateCourseSkillDto: UpdateCourseSkillDto,
  ): Promise<CourseSkill> {
    return await this.prisma.courseSkill.update({
      where: { id },
      data: updateCourseSkillDto,
    });
  }

  async remove(id: string): Promise<CourseSkill> {
    return await this.prisma.courseSkill.delete({
      where: { id },
    });
  }
}
