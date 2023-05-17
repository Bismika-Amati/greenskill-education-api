import { Injectable } from '@nestjs/common';
import { CreateSubDistrictDto } from './dto/create-sub-district.dto';
import { UpdateSubDistrictDto } from './dto/update-sub-district.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySubDistrictDto } from './dto/query-sub-district.dto';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { Prisma, SubDistrict } from '@prisma/client';

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
          deletedAt: null,
        },
      },
    );
  }

  async findOne(id: string): Promise<SubDistrict | null> {
    return await this.prisma.subDistrict.findUnique({
      where: { id },
      include: {
        districts: true,
      },
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
