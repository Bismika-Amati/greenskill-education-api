import { Injectable } from '@nestjs/common';
import { District, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDistrictDto, QueryDistrictDto, UpdateDistrictDto } from './dto';

@Injectable()
export class DistrictsService {
  constructor(private prisma: PrismaService) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    return await this.prisma.district.create({ data: createDistrictDto });
  }

  async findAll(
    queryDto: QueryDistrictDto,
  ): Promise<PaginatedResult<District>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<District, Prisma.DistrictFindManyArgs>(
      this.prisma.district,
      {
        where: {
          name: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<District | null> {
    return await this.prisma.district.findUnique({
      where: { id },
      include: {
        city: true,
      },
    });
  }

  async update(
    id: string,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    return await this.prisma.district.update({
      where: { id },
      data: updateDistrictDto,
    });
  }

  async remove(id: string): Promise<District> {
    return await this.prisma.district.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
