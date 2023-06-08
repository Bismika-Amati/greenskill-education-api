import { Injectable } from '@nestjs/common';
import { DoneModule, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDoneModuleDto,
  QueryDoneModuleDto,
  UpdateDoneModuleDto,
} from './dto';

@Injectable()
export class DoneModulesService {
  constructor(private prisma: PrismaService) {}

  async create(createDoneModuleDto: CreateDoneModuleDto): Promise<DoneModule> {
    return await this.prisma.doneModule.create({ data: createDoneModuleDto });
  }

  async findAll(
    queryDto: QueryDoneModuleDto,
  ): Promise<PaginatedResult<DoneModule>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<DoneModule, Prisma.DoneModuleFindManyArgs>(
      this.prisma.doneModule,
      {
        where: {
          userId: queryDto.userId,
          subModuleId: queryDto.subModuleId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<DoneModule | null> {
    return await this.prisma.doneModule.findUnique({
      where: { id },
      include: {
        subModule: true,
        user: true,
      },
    });
  }

  async update(
    id: string,
    updateDoneModuleDto: UpdateDoneModuleDto,
  ): Promise<DoneModule> {
    return await this.prisma.doneModule.update({
      where: { id },
      data: updateDoneModuleDto,
    });
  }

  async remove(id: string): Promise<DoneModule> {
    return await this.prisma.doneModule.delete({
      where: { id },
    });
  }
}
