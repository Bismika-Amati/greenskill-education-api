import { Injectable } from '@nestjs/common';
import { Province, Prisma } from '@prisma/client';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProvinceDto, QueryProvinceDto, UpdateProvinceDto } from './dto';

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
          name: {
            contains: queryDto.search,
            mode: 'insensitive',
          },
        },
        orderBy: queryDto.getOrderBy,
      },
    );
  }

  async findOne(id: string): Promise<Province | null> {
    return await this.prisma.province.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    return await this.prisma.province.update({
      where: { id },
      data: updateProvinceDto,
    });
  }

  async remove(id: string): Promise<Province> {
    return await this.prisma.province.delete({
      where: { id },
    });
  }
}
