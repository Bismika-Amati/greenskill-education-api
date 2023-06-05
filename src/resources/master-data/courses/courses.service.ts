import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto, QueryCourseDto, UpdateCourseDto } from './dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.prisma.course.create({ data: createCourseDto });
  }

  async findAll(queryDto: QueryCourseDto): Promise<PaginatedResult<Course>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<Course, Prisma.CourseFindManyArgs>(
      this.prisma.course,
      {
        where: {
          title: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<Course | null> {
    return await this.prisma.course.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string): Promise<Course> {
    return await this.prisma.course.delete({
      where: { id },
    });
  }
}
