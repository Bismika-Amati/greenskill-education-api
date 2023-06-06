import { Injectable } from '@nestjs/common';
import { SubModule, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateSubModuleDto,
  QuerySubModuleDto,
  UpdateSubModuleDto,
} from './dto';

@Injectable()
export class SubModulesService {
  constructor(private prisma: PrismaService) {}

  async create(createSubModuleDto: CreateSubModuleDto): Promise<SubModule> {
    return await this.prisma.subModule.create({ data: createSubModuleDto });
  }

  async findAll(
    queryDto: QuerySubModuleDto,
  ): Promise<PaginatedResult<SubModule>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<SubModule, Prisma.SubModuleFindManyArgs>(
      this.prisma.subModule,
      {
        where: {
          title: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
          courseId: queryDto.courseId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<SubModule | null> {
    return await this.prisma.subModule.findUnique({
      where: { id },
      include: {
        course: true,
        articleSubModule: {
          orderBy: {
            number: 'asc',
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateSubModuleDto: UpdateSubModuleDto,
  ): Promise<SubModule> {
    return await this.prisma.subModule.update({
      where: { id },
      data: updateSubModuleDto,
    });
  }

  async remove(id: string): Promise<SubModule> {
    return await this.prisma.subModule.delete({
      where: { id },
    });
  }
}
