import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Province } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { QueryProvinceDto } from './dto/query-province.dto';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    return await this.prisma.province.create({ data: createProvinceDto });
  }

  async findAll(
    queryDto: QueryProvinceDto,
  ): Promise<PaginatedResult<Province>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    return await paginate<Province, Prisma.ProvinceFindManyArgs>(
      this.prisma.province,
      {
        where: {
          deletedAt: null,
        },
      },
    );
  }

  async findOne(id: number): Promise<Province | null> {
    return await this.prisma.province.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    return await this.prisma.province.update({
      where: { id },
      data: updateProvinceDto,
    });
  }

  async remove(id: number): Promise<Province> {
    return await this.prisma.province.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
