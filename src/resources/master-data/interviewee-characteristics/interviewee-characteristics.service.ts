import { Injectable } from '@nestjs/common';
import { CreateIntervieweeCharacteristicDto } from './dto/create-interviewee-characteristic.dto';
import { UpdateIntervieweeCharacteristicDto } from './dto/update-interviewee-characteristic.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IntervieweeCharacteristic, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { QueryIntervieweeCharacteristicDto } from './dto';

@Injectable()
export class IntervieweeCharacteristicsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createIntervieweeCharacteristicDto: CreateIntervieweeCharacteristicDto,
  ): Promise<IntervieweeCharacteristic> {
    return await this.prisma.intervieweeCharacteristic.create({
      data: createIntervieweeCharacteristicDto,
    });
  }

  async findAll(
    queryDto: QueryIntervieweeCharacteristicDto,
  ): Promise<PaginatedResult<IntervieweeCharacteristic>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<
      IntervieweeCharacteristic,
      Prisma.IntervieweeCharacteristicFindManyArgs
    >(this.prisma.intervieweeCharacteristic, {
      where: {
        title: {
          contains: queryDto.search,
          mode: 'insensitive',
        },
      },
      orderBy: queryDto.getOrderBy,
    });
  }

  async findOne(id: string): Promise<IntervieweeCharacteristic | null> {
    return await this.prisma.intervieweeCharacteristic.findUnique({
      where: { id },
      include: {
        interviewRecap: true,
      },
    });
  }

  async update(
    id: string,
    updateIntervieweeCharacteristicDto: UpdateIntervieweeCharacteristicDto,
  ): Promise<IntervieweeCharacteristic> {
    return await this.prisma.intervieweeCharacteristic.update({
      where: { id },
      data: updateIntervieweeCharacteristicDto,
    });
  }

  async remove(id: string): Promise<IntervieweeCharacteristic> {
    return await this.prisma.intervieweeCharacteristic.delete({
      where: { id },
    });
  }
}
