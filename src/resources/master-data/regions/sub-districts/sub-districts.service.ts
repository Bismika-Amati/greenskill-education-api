import { Injectable } from '@nestjs/common';
import { SubDistrict, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateSubDistrictDto,
  QuerySubDistrictDto,
  UpdateSubDistrictDto,
} from './dto';

@Injectable()
export class SubDistrictsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createSubDistrictDto: CreateSubDistrictDto,
  ): Promise<SubDistrict> {
    return await this.prisma.subDistrict.create({ data: createSubDistrictDto });
  }

  async findAll(
    queryDto: QuerySubDistrictDto,
  ): Promise<PaginatedResult<SubDistrict>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<SubDistrict, Prisma.SubDistrictFindManyArgs>(
      this.prisma.subDistrict,
      {
        where: {
          name: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
          districtId: queryDto.districtId,
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<SubDistrict | null> {
    return await this.prisma.subDistrict.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateSubDistrictDto: UpdateSubDistrictDto,
  ): Promise<SubDistrict> {
    return await this.prisma.subDistrict.update({
      where: { id },
      data: updateSubDistrictDto,
    });
  }

  async remove(id: string): Promise<SubDistrict> {
    return await this.prisma.subDistrict.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
