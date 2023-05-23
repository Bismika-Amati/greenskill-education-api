import { Injectable } from '@nestjs/common';
import { CreateExistingAlternativeDto } from './dto/create-existing-alternative.dto';
import { UpdateExistingAlternativeDto } from './dto/update-existing-alternative.dto';
import { ExistingAlternative, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryExistingAlternativeDto } from './dto';

@Injectable()
export class ExistingAlternativesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExistingAlternativeDto: CreateExistingAlternativeDto,
  ): Promise<ExistingAlternative> {
    return await this.prisma.existingAlternative.create({
      data: createExistingAlternativeDto,
    });
  }

  async findAll(
    queryDto: QueryExistingAlternativeDto,
  ): Promise<PaginatedResult<ExistingAlternative>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<
      ExistingAlternative,
      Prisma.ExistingAlternativeFindManyArgs
    >(this.prisma.existingAlternative, {
      where: {
        title: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
        problemStatementId: queryDto.problemStatementId,
      },
      orderBy: queryDto.getOrderBy,
    });
  }

  async findOne(id: string): Promise<ExistingAlternative | null> {
    return await this.prisma.existingAlternative.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateExistingAlternativeDto: UpdateExistingAlternativeDto,
  ): Promise<ExistingAlternative> {
    return await this.prisma.existingAlternative.update({
      where: { id },
      data: updateExistingAlternativeDto,
    });
  }

  async remove(id: string): Promise<ExistingAlternative> {
    return await this.prisma.existingAlternative.delete({
      where: { id },
    });
  }
}
