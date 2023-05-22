import { Injectable } from '@nestjs/common';
import { CreateEarlyAdopterDto } from './dto/create-early-adopter.dto';
import { UpdateEarlyAdopterDto } from './dto/update-early-adopter.dto';
import { EarlyAdopter, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryEarlyAdopterDto } from './dto';

@Injectable()
export class EarlyAdoptersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createEarlyAdopterDto: CreateEarlyAdopterDto,
  ): Promise<EarlyAdopter> {
    return await this.prisma.customerSegment.create({
      data: createEarlyAdopterDto,
    });
  }

  async findAll(
    queryDto: QueryEarlyAdopterDto,
  ): Promise<PaginatedResult<EarlyAdopter>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<EarlyAdopter, Prisma.EarlyAdopterFindManyArgs>(
      this.prisma.province,
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

  async findOne(id: string): Promise<EarlyAdopter | null> {
    return await this.prisma.customerSegment.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateEarlyAdopterDto: UpdateEarlyAdopterDto,
  ): Promise<EarlyAdopter> {
    return await this.prisma.customerSegment.update({
      where: { id },
      data: updateEarlyAdopterDto,
    });
  }

  async remove(id: string): Promise<EarlyAdopter> {
    return await this.prisma.customerSegment.delete({
      where: { id },
    });
  }
}
