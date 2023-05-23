import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Prisma, Problem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryProblemDto } from './dto';
import { PaginatedResult, createPaginator } from 'prisma-pagination';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}

  async create(createProblemDto: CreateProblemDto): Promise<Problem> {
    return await this.prisma.problem.create({
      data: createProblemDto,
    });
  }

  async findAll(queryDto: QueryProblemDto): Promise<PaginatedResult<Problem>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<Problem, Prisma.ProblemFindManyArgs>(
      this.prisma.problem,
      {
        where: {
          title: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
          interviewRecapId: queryDto.interviewRecapId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<Problem | null> {
    return await this.prisma.problem.findUnique({
      where: { id },
      include: {
        interviewRecap: true,
      },
    });
  }

  async update(
    id: string,
    updateProblemDto: UpdateProblemDto,
  ): Promise<Problem> {
    return await this.prisma.problem.update({
      where: { id },
      data: updateProblemDto,
    });
  }

  async remove(id: string): Promise<Problem> {
    return await this.prisma.problem.delete({
      where: { id },
    });
  }
}
