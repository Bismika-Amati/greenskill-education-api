import { Injectable } from '@nestjs/common';
import { CreateProblemStatementDto } from './dto/create-problem-statement.dto';
import { UpdateProblemStatementDto } from './dto/update-problem-statement.dto';
import { Prisma, ProblemStatement } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryProblemStatementDto } from './dto';
import { PaginatedResult, createPaginator } from 'prisma-pagination';

@Injectable()
export class ProblemStatementsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProblemStatementDto: CreateProblemStatementDto,
  ): Promise<ProblemStatement> {
    return await this.prisma.problemStatement.create({
      data: createProblemStatementDto,
    });
  }

  async findAll(
    queryDto: QueryProblemStatementDto,
  ): Promise<PaginatedResult<ProblemStatement>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<
      ProblemStatement,
      Prisma.ProblemStatementFindManyArgs
    >(this.prisma.problemStatement, {
      where: {
        topic: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
        villageId: queryDto.villageId,
      },
      orderBy: queryDto.getOrderBy,
      include: {
        village: true,
      },
    });
  }

  async findOne(id: string): Promise<ProblemStatement | null> {
    return await this.prisma.problemStatement.findUnique({
      where: { id },
      include: {
        village: true,
      },
    });
  }

  async update(
    id: string,
    updateProblemStatementDto: UpdateProblemStatementDto,
  ): Promise<ProblemStatement> {
    return await this.prisma.problemStatement.update({
      where: { id },
      data: updateProblemStatementDto,
    });
  }

  async remove(id: string): Promise<ProblemStatement> {
    return await this.prisma.problemStatement.delete({
      where: { id },
    });
  }
}
