import { Injectable } from '@nestjs/common';
import { CreateInterviewRecapDto } from './dto/create-interview-recap.dto';
import { UpdateInterviewRecapDto } from './dto/update-interview-recap.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryInterviewRecapDto } from './dto/query-interview-recap.dto';
import { Prisma, InterviewRecap } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';

@Injectable()
export class InterviewRecapsService {
  constructor(private prisma: PrismaService) {}

  async create(createInterviewRecapDto: CreateInterviewRecapDto) {
    console.log('createInterviewRecapDto ', createInterviewRecapDto);
    return await this.prisma.interviewRecap.create({
      data: createInterviewRecapDto,
    });
  }

  async findAll(
    queryDto: QueryInterviewRecapDto,
  ): Promise<PaginatedResult<InterviewRecap>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<InterviewRecap, Prisma.InterviewRecapFindManyArgs>(
      this.prisma.interviewRecap,
      {
        where: {
          problemStatementId: queryDto.problemStatementId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<InterviewRecap | null> {
    return await this.prisma.interviewRecap.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateInterviewRecapDto: UpdateInterviewRecapDto,
  ): Promise<InterviewRecap> {
    return await this.prisma.interviewRecap.update({
      where: { id },
      data: updateInterviewRecapDto,
    });
  }

  async remove(id: string): Promise<InterviewRecap> {
    return await this.prisma.interviewRecap.delete({
      where: { id },
    });
  }
}
